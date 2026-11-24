#!/usr/bin/env node
/**
 * Release archive helper, called by the `release:*` Mise tasks.
 *
 * check-version <tag>
 *   Fails unless the tag (with or without a leading "v") equals the
 *   apps/extension/package.json version (the release version's single source).
 *
 * collect --out <dir> <browser>...
 *   Copies the archives `wxt zip` wrote to .output/ into <dir> under the public
 *   release names, checks that every built manifest carries the package version,
 *   and writes SHA256SUMS in `sha256sum -c` format.
 *
 * notes <version> <file>
 *   Writes the CHANGELOG.md section for <version> (a `## ` heading containing
 *   the version) to <file>, or exits 3 when there is no such section so the
 *   workflow can fall back to GitHub's generated notes.
 *
 *     deepscope-<version>-chrome.zip
 *     deepscope-<version>-firefox.zip
 *     deepscope-<version>-firefox-sources.zip
 *     deepscope-<version>-safari.zip
 *
 * WXT names its archives from a template (`<package>-<version>-<browser>.zip`
 * and `<package>-<version>-sources.zip`). The collector matches the suffix
 * rather than the package name so a rename of the npm package cannot silently
 * drop an archive; exactly one match per browser is required.
 */
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = '.output';
const APP_MANIFEST = 'apps/extension/package.json';
const PUBLIC_NAME = 'deepscope';
const BROWSERS = new Set(['chrome', 'firefox', 'safari']);

/** @param {string} message */
function fail(message) {
	console.error(`release: ${message}`);
	process.exit(1);
}

/** @returns {string} */
function packageVersion() {
	return JSON.parse(readFileSync(APP_MANIFEST, 'utf8')).version;
}

/** @param {string} tag */
function checkVersion(tag) {
	if (!tag) fail('check-version needs a tag such as v0.2.0');
	const tagVersion = tag.replace(/^refs\/tags\//, '').replace(/^v/, '');
	const version = packageVersion();
	if (tagVersion !== version) fail(`tag ${tag} does not match ${APP_MANIFEST} version ${version}`);
	console.log(`release: tag ${tag} matches ${APP_MANIFEST} version ${version}`);
}

/**
 * Returns the single .output entry ending in `suffix`.
 * @param {readonly string[]} entries
 * @param {string} suffix
 */
function single(entries, suffix) {
	const matches = entries.filter((name) => name.endsWith(suffix));
	if (matches.length !== 1) {
		fail(`expected exactly one ${OUTPUT_DIR}/*${suffix}, found ${matches.length}: ${matches.join(', ') || 'none'}`);
	}
	return join(OUTPUT_DIR, matches[0]);
}

/** @param {string} path */
function sha256(path) {
	return createHash('sha256').update(readFileSync(path)).digest('hex');
}

/** @param {readonly string[]} args */
function collect(args) {
	const outIndex = args.indexOf('--out');
	if (outIndex < 0 || !args[outIndex + 1]) fail('collect needs --out <dir>');
	const out = args[outIndex + 1];
	const browsers = args.filter((_, index) => index !== outIndex && index !== outIndex + 1);
	if (browsers.length === 0) fail('collect needs at least one browser');
	for (const browser of browsers) if (!BROWSERS.has(browser)) fail(`unknown browser ${browser}`);

	const version = packageVersion();
	const entries = readdirSync(OUTPUT_DIR);
	/** @type {Array<[source: string, name: string]>} */
	const archives = [];

	for (const browser of browsers) {
		const manifestPath = join(OUTPUT_DIR, `${browser}-mv3`, 'manifest.json');
		const manifestVersion = JSON.parse(readFileSync(manifestPath, 'utf8')).version;
		if (manifestVersion !== version) {
			fail(`${manifestPath} version ${manifestVersion} does not match ${APP_MANIFEST} version ${version}`);
		}
		archives.push([single(entries, `-${browser}.zip`), `${PUBLIC_NAME}-${version}-${browser}.zip`]);
		if (browser === 'firefox') {
			archives.push([single(entries, '-sources.zip'), `${PUBLIC_NAME}-${version}-firefox-sources.zip`]);
		}
	}

	rmSync(out, { recursive: true, force: true });
	mkdirSync(out, { recursive: true });
	const sums = [];
	for (const [source, name] of archives) {
		const target = join(out, name);
		copyFileSync(source, target);
		sums.push(`${sha256(target)}  ${name}`);
	}
	sums.sort((a, b) => a.slice(66).localeCompare(b.slice(66)));
	writeFileSync(join(out, 'SHA256SUMS'), `${sums.join('\n')}\n`);
	console.log(`release: wrote ${archives.length} archives and SHA256SUMS to ${out}`);
	for (const line of sums) console.log(`  ${line}`);
}

/**
 * @param {string} version
 * @param {string} file
 */
function notes(version, file) {
	if (!version || !file) fail('notes needs <version> <file>');
	if (!existsSync('CHANGELOG.md')) process.exit(3);
	const lines = readFileSync('CHANGELOG.md', 'utf8').split('\n');
	const escaped = version.replaceAll('.', '\\.');
	const heading = new RegExp(`^## .*(?<![\\w.])v?${escaped}(?![\\w.])`);
	const start = lines.findIndex((line) => heading.test(line));
	if (start < 0) process.exit(3);
	const end = lines.findIndex((line, index) => index > start && line.startsWith('## '));
	const body = lines.slice(start + 1, end < 0 ? undefined : end).join('\n').trim();
	if (!body) process.exit(3);
	writeFileSync(file, `${body}\n`);
	console.log(`release: notes for ${version} taken from CHANGELOG.md`);
}

const [command, ...rest] = process.argv.slice(2);
if (command === 'check-version') checkVersion(rest[0]);
else if (command === 'collect') collect(rest);
else if (command === 'notes') notes(rest[0], rest[1]);
else fail('usage: archives.mjs check-version <tag> | collect --out <dir> <browser>... | notes <version> <file>');
