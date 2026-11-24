/**
 * Print registry counts and compiler diagnostic counts for a bundled registry source.
 *
 * Usage: node scripts/registry/stats.mjs [.wxt/registry-sources.mjs]
 *
 * `wxt prepare` writes `.wxt/registry-sources.mjs`, which exports the merged
 * `technologies` list and `compileTechnologyRegistry`.
 */
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const file = resolve(process.argv[2] ?? '.wxt/registry-sources.mjs');
const { technologies, compileTechnologyRegistry } = await import(pathToFileURL(file).href);
const artifact = compileTechnologyRegistry({ technologies, sourceKind: 'typescript-definition' });

const diagnostics = {};
for (const diagnostic of artifact.diagnostics) {
	const key = `${diagnostic.severity}:${diagnostic.code}`;
	diagnostics[key] = (diagnostics[key] ?? 0) + 1;
}
const rulesByKind = {};
for (const technology of technologies) {
	for (const rule of technology.rules) rulesByKind[rule.kind] = (rulesByKind[rule.kind] ?? 0) + 1;
}

console.log(JSON.stringify({
	technologies: technologies.length,
	compiledTechnologies: artifact.technologies.length,
	authoredRules: Object.values(rulesByKind).reduce((sum, count) => sum + count, 0),
	matcherRules: artifact.matcherIndex.ruleCount,
	diagnostics: artifact.diagnostics.length,
	diagnosticsByCode: Object.fromEntries(Object.entries(diagnostics).sort()),
	rulesByKind: Object.fromEntries(Object.entries(rulesByKind).sort()),
}, null, '\t'));
