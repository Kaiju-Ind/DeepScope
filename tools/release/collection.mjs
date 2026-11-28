import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, lstatSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, realpathSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';

/** WXT owns the browser builds and archive inputs under this root. */
const INPUT = '.output';
/** Every supported unpacked build remains protected, even when it is not selected. */
const BROWSERS = new Set(['chrome', 'firefox', 'safari']);
/** Only public release basenames can belong to a replaceable collection. */
const ARCHIVE_NAME = /^deepscope-\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?-(?:chrome|firefox(?:-sources)?|safari)\.zip$/;

/** Test path ancestry without treating a shared name prefix as a parent. */
function contains(/** @type {string} */ parent, /** @type {string} */ child) {
	const rest = relative(parent, child);
	return rest === '' || (!isAbsolute(rest) && rest !== '..' && !rest.startsWith(`..${sep}`));
}

/** Resolve existing parent aliases before checking a destination that may not exist yet. */
function canonical(/** @type {string} */ path) {
	let ancestor = resolve(path);
	const missing = [];
	while (!existsSync(ancestor)) {
		missing.unshift(basename(ancestor));
		ancestor = dirname(ancestor);
	}
	return join(realpathSync(ancestor), ...missing);
}

/**
 * Keep the checkout, WXT inputs and unpacked builds outside the collector's owner.
 * A parent alias is allowed only when its resolved destination passes these checks.
 */
function destination(/** @type {string} */ path) {
	if (lstatSync(path, { throwIfNoEntry: false })?.isSymbolicLink()) {
		throw new Error(`refusing symlink output ${path}`);
	}
	const out = canonical(path);
	const checkout = realpathSync('.');
	const input = realpathSync(INPUT);
	if (contains(out, checkout) || contains(out, input) || (contains(checkout, out) && !contains(input, out))) {
		throw new Error(`output ${path} overlaps source or archive inputs; choose a candidate directory under ${INPUT} or outside the checkout`);
	}
	for (const browser of BROWSERS) {
		const unpacked = canonical(join(INPUT, `${browser}-mv3`));
		if (contains(unpacked, out) || contains(out, unpacked)) {
			throw new Error(`output ${path} overlaps the ${browser} build`);
		}
	}
	return out;
}

/** Hash the exact copied bytes recorded in the public checksum file. */
function sha256(/** @type {string} */ path) {
	return createHash('sha256').update(readFileSync(path)).digest('hex');
}

/**
 * Accept an absent/empty directory or an intact collection from an earlier run.
 * Unknown files, nested directories and links never become deletion candidates.
 */
function replaceable(/** @type {string} */ directory) {
	const state = lstatSync(directory, { throwIfNoEntry: false });
	if (!state) return false;
	if (!state.isDirectory() || state.isSymbolicLink()) throw new Error(`output ${directory} must be a real directory`);
	const entries = readdirSync(directory, { withFileTypes: true });
	if (entries.length === 0) return true;
	if (entries.some((entry) => !entry.isFile()) || !entries.some((entry) => entry.name === 'SHA256SUMS')) {
		throw new Error(`refusing to replace unowned contents in ${directory}`);
	}
	const lines = readFileSync(join(directory, 'SHA256SUMS'), 'utf8').trim().split('\n');
	const names = new Set();
	for (const line of lines) {
		const match = /^([a-f0-9]{64})  (.+)$/.exec(line);
		const digest = match?.[1];
		const name = match?.[2];
		if (!digest || !name || !ARCHIVE_NAME.test(name) || names.has(name)) {
			throw new Error(`invalid collection checksum record in ${directory}`);
		}
		if (!entries.some((entry) => entry.name === name) || sha256(join(directory, name)) !== digest) {
			throw new Error(`collection checksum does not match ${name} in ${directory}`);
		}
		names.add(name);
	}
	if (entries.length !== names.size + 1) throw new Error(`refusing to replace unlisted files in ${directory}`);
	return true;
}

/**
 * Prepare a complete replacement beside its destination before moving old files.
 * Ordinary publication failures restore the prior collection. If restoration also
 * fails, retain the named staging directory so neither candidate is discarded.
 * One command must own a destination at a time; two renames are not a crash transaction.
 * @param {string} out
 * @param {ReadonlyArray<readonly [source: string, name: string]>} archives
 */
function replace(out, archives) {
	replaceable(out);
	mkdirSync(dirname(out), { recursive: true });
	const staging = mkdtempSync(join(dirname(out), '.deepscope-release-'));
	const next = join(staging, 'next');
	const previous = join(staging, 'previous');
	/** Restoration failure transfers this directory to the maintainer for recovery. */
	let retained = false;
	/** Preserve the original failure if cleanup itself also fails. */
	let failure;
	try {
		mkdirSync(next);
		const sums = [];
		for (const [source, name] of archives) {
			if (!ARCHIVE_NAME.test(name)) throw new Error(`unsupported public archive name ${name}`);
			const target = join(next, name);
			copyFileSync(source, target);
			sums.push(`${sha256(target)}  ${name}`);
		}
		sums.sort((a, b) => a.slice(66).localeCompare(b.slice(66)));
		writeFileSync(join(next, 'SHA256SUMS'), `${sums.join('\n')}\n`);

		// Recheck ownership after copying, before any prior candidate moves.
		const existed = replaceable(out);
		if (existed) renameSync(out, previous);
		try {
			renameSync(next, out);
		} catch (error) {
			if (existed) {
				try {
					renameSync(previous, out);
				} catch (restoreError) {
					retained = true;
					throw new AggregateError([error, restoreError], `cannot publish or restore ${out}; both candidates remain in ${staging}`);
				}
			}
			throw error;
		}
		return sums;
	} catch (error) {
		failure = error;
		throw error;
	} finally {
		if (!retained) {
			try {
				rmSync(staging, { recursive: true, force: true });
			} catch (cleanupError) {
				if (failure) throw new AggregateError([failure, cleanupError], `collection and staging cleanup failed; inspect ${staging}`);
				throw cleanupError;
			}
		}
	}
}

/** Require one WXT archive per suffix so a stale build cannot win by directory order. */
function single(/** @type {readonly string[]} */ entries, /** @type {string} */ suffix) {
	const matches = entries.filter((name) => name.endsWith(suffix));
	const match = matches[0];
	if (matches.length !== 1 || !match) {
		throw new Error(`expected exactly one ${INPUT}/*${suffix}, found ${matches.length}: ${matches.join(', ') || 'none'}`);
	}
	return join(INPUT, match);
}

/**
 * Collect the requested WXT archives under public release names and checksums.
 * Run from the checkout root. Version/selection and destination checks precede
 * replacement; an existing collection is replaced only after every copy succeeds.
 * @param {readonly string[]} args CLI arguments after `collect`.
 * @param {string} version Release version from the extension package manifest.
 */
export function collect(args, version) {
	const outIndex = args.indexOf('--out');
	const requested = args[outIndex + 1];
	if (outIndex < 0 || !requested) throw new Error('collect needs --out <dir>');
	const browsers = args.filter((_, index) => index !== outIndex && index !== outIndex + 1);
	if (browsers.length === 0) throw new Error('collect needs at least one browser');
	for (const browser of browsers) if (!BROWSERS.has(browser)) throw new Error(`unknown browser ${browser}`);
	if (new Set(browsers).size !== browsers.length) throw new Error('collect needs distinct browsers');

	const out = destination(requested);
	const entries = readdirSync(INPUT);
	/** Public names do not depend on the private workspace package's name. */
	/** @type {Array<[source: string, name: string]>} */
	const archives = [];
	for (const browser of browsers) {
		const manifestPath = join(INPUT, `${browser}-mv3`, 'manifest.json');
		const manifestVersion = JSON.parse(readFileSync(manifestPath, 'utf8')).version;
		if (manifestVersion !== version) {
			throw new Error(`${manifestPath} version ${manifestVersion} does not match apps/extension/package.json version ${version}`);
		}
		archives.push([single(entries, `-${browser}.zip`), `deepscope-${version}-${browser}.zip`]);
		if (browser === 'firefox') archives.push([single(entries, '-sources.zip'), `deepscope-${version}-firefox-sources.zip`]);
	}

	const sums = replace(out, archives);
	console.log(`release: wrote ${archives.length} archives and SHA256SUMS to ${out}`);
	for (const line of sums) console.log(`  ${line}`);
}
