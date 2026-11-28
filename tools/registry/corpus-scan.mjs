/**
 * Run the registry's scriptContent and script URL rules against real npm bundles.
 *
 * Each corpus entry is an extracted npm package (`npm pack` + `tar -x`) whose
 * technology is known. Any other technology a rule reports is a false-positive
 * candidate, unless it is listed as an expected neighbor (module formats,
 * bundler runtimes, and similar facts that are true of most bundles).
 *
 * Usage:
 *   node tools/registry/corpus-scan.mjs --corpus <dir> [--sources apps/extension/.wxt/registry-sources.mjs] [--json out.json]
 *
 * <dir> holds one folder per package, named `<package>@<version>` or anything
 * else, with a `corpus.json` mapping folder name to expected technology ids:
 *   { "react-dom-19.3.1": ["react", "react-dom"], ... }
 *
 * Script URL rules are evaluated against a synthetic jsDelivr URL for each file,
 * `https://cdn.jsdelivr.net/npm/<package>@<version>/<path>`, which is how
 * these files commonly appear on real pages.
 */
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';

const { values: args } = parseArgs({
	options: {
		corpus: { type: 'string' },
		sources: { type: 'string', default: 'apps/extension/.wxt/registry-sources.mjs' },
		json: { type: 'string' },
		'max-files': { type: 'string', default: '12' },
	},
});
if (!args.corpus) throw new Error('--corpus <dir> is required');

/** Technologies that are legitimately present in many unrelated bundles. */
const NEUTRAL = new Set(['amd', 'umd', 'commonjs', 'es-modules', 'webpack', 'rollup', 'esbuild', 'vite', 'babel', 'swc', 'typescript', 'terser', 'uglify', 'core-js', 'tslib']);

const { technologies } = await import(pathToFileURL(resolve(args.sources)).href);
const rules = technologies.flatMap((technology) => technology.rules
	.filter((rule) => ['scriptContent', 'scriptSrc', 'resourceUrl'].includes(rule.kind) && rule.pattern)
	.map((rule) => ({ technologyId: technology.id, rule, pattern: new RegExp(rule.pattern.source, rule.pattern.flags.replace('g', '')) })));

const corpusRoot = resolve(args.corpus);
const expectations = JSON.parse(await readFile(join(corpusRoot, 'corpus.json'), 'utf8'));

/** Select a bounded JavaScript corpus, preferring production-looking bundles and then larger files within the accepted size range. */
async function bundleFiles(dir) {
	const out = [];
	/** Collect candidate JavaScript bundles recursively while excluding dependency directories and files outside the scan's size limits. */
	async function walk(current) {
		for (const entry of await readdir(current, { withFileTypes: true })) {
			const path = join(current, entry.name);
			if (entry.isDirectory()) {
				if (entry.name !== 'node_modules') await walk(path);
			} else if (/\.(?:m?js|cjs)$/.test(entry.name) && !/\.d\.[mc]?ts$/.test(entry.name)) {
				const size = (await stat(path)).size;
				if (size > 2_000 && size < 3_000_000) out.push({ path, size });
			}
		}
	}
	await walk(dir);
	// Prefer production-looking bundles; keep the scan bounded.
	return out
		.sort((a, b) => Number(/\.min\.|prod/.test(b.path)) - Number(/\.min\.|prod/.test(a.path)) || b.size - a.size)
		.slice(0, Number(args['max-files']));
}

const findings = [];
for (const [folder, expected] of Object.entries(expectations)) {
	const allowed = new Set([...expected, ...NEUTRAL]);
	const pkgDir = join(corpusRoot, folder, 'package');
	const pkg = JSON.parse(await readFile(join(pkgDir, 'package.json'), 'utf8'));
	for (const { path } of await bundleFiles(pkgDir)) {
		const content = await readFile(path, 'utf8');
		const url = `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/${relative(pkgDir, path)}`;
		for (const { technologyId, rule, pattern } of rules) {
			if (allowed.has(technologyId)) continue;
			const value = rule.kind === 'scriptContent' ? content : url;
			const match = pattern.exec(value);
			if (match) findings.push({ package: `${pkg.name}@${pkg.version}`, file: relative(pkgDir, path), technologyId, ruleId: rule.id, kind: rule.kind, confidence: rule.confidence ?? 100, match: match[0].slice(0, 80) });
		}
	}
}

const byTechnology = new Map();
for (const finding of findings) {
	const entry = byTechnology.get(finding.technologyId) ?? { packages: new Set(), rules: new Set() };
	entry.packages.add(finding.package);
	entry.rules.add(finding.ruleId);
	byTechnology.set(finding.technologyId, entry);
}
const ranked = [...byTechnology].map(([id, entry]) => ({ id, packages: entry.packages.size, rules: [...entry.rules] })).sort((a, b) => b.packages - a.packages || a.id.localeCompare(b.id));
console.log(JSON.stringify({ corpusPackages: Object.keys(expectations).length, ruleCount: rules.length, falsePositiveTechnologies: ranked.length, falsePositiveRules: new Set(findings.map((f) => f.ruleId)).size, top: ranked.slice(0, 40) }, null, '\t'));
if (args.json) await writeFile(args.json, JSON.stringify({ ranked, findings }, null, '\t'));
