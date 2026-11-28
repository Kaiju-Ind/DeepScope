#!/usr/bin/env node
/**
 * Release preparation commands, called by the `release:*` Mise tasks.
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
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { collect } from './collection.mjs';

/** The extension package is the release version's single authored source. */
const APP_MANIFEST = 'apps/extension/package.json';

/**
 * Stop the release command with a diagnostic and nonzero status before it can report success.
 * @param {string} message
 * @returns {never}
 */
function fail(message) {
	console.error(`release: ${message}`);
	process.exit(1);
}

/**
 * Read the extension manifest's release version; archive names and built manifests must agree with it.
 * @returns {string}
 */
function packageVersion() {
	return JSON.parse(readFileSync(APP_MANIFEST, 'utf8')).version;
}

/**
 * Accept plain versions, v-prefixed tags or full tag refs only when they match the extension version.
 * @param {string | undefined} tag
 */
function checkVersion(tag) {
	if (!tag) fail('check-version needs a tag such as v0.2.0');
	const tagVersion = tag.replace(/^refs\/tags\//, '').replace(/^v/, '');
	const version = packageVersion();
	if (tagVersion !== version) fail(`tag ${tag} does not match ${APP_MANIFEST} version ${version}`);
	console.log(`release: tag ${tag} matches ${APP_MANIFEST} version ${version}`);
}

/**
 * Write the exact version's changelog section, or exit 3 so the workflow can use generated notes.
 * @param {string | undefined} version
 * @param {string | undefined} file
 */
function notes(version, file) {
	if (!version || !file) fail('notes needs <version> <file>');
	if (!existsSync('CHANGELOG.md')) process.exit(3);
	const lines = readFileSync('CHANGELOG.md', 'utf8').split('\n');
	// Prerelease and build suffixes belong to the version, not its delimiters.
	const heading = new RegExp(`^## .*(?<![\\w.+-])v?${RegExp.escape(version)}(?![\\w.+-])`);
	const start = lines.findIndex((line) => heading.test(line));
	if (start < 0) process.exit(3);
	const end = lines.findIndex((line, index) => index > start && line.startsWith('## '));
	const body = lines.slice(start + 1, end < 0 ? undefined : end).join('\n').trim();
	if (!body) process.exit(3);
	writeFileSync(file, `${body}\n`);
	console.log(`release: notes for ${version} taken from CHANGELOG.md`);
}

const [command, ...rest] = process.argv.slice(2);
try {
	if (command === 'check-version') checkVersion(rest[0]);
	else if (command === 'collect') collect(rest, packageVersion());
	else if (command === 'notes') notes(rest[0], rest[1]);
	else fail('usage: archives.mjs check-version <tag> | collect --out <dir> <browser>... | notes <version> <file>');
} catch (error) {
	console.error(`release: ${error instanceof Error ? error.message : String(error)}`);
	if (error instanceof AggregateError) {
		for (const cause of error.errors) console.error(`  ${cause instanceof Error ? cause.message : String(cause)}`);
	}
	process.exitCode = 1;
}
