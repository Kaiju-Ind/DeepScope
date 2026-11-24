/**
 * Find script URL rules whose pattern also matches another technology's file name.
 *
 * Wappalyzer-era patterns are often unanchored (`react(?:-dom)?(?:\.min)?\.js`),
 * so they match `preact.min.js` or `solid-start.js` as well. For every technology
 * id, this builds `https://cdn.example.com/npm/<id>/dist/<id>.min.js` and
 * `https://cdn.example.com/js/<id>.js`, then reports scriptSrc/resourceUrl rules of
 * a *different* technology that match it, where the other id contains no word of
 * the rule owner's id as a whole segment (so `react-dom` for `react` is fine).
 *
 * Usage: node tools/registry/name-collision-scan.mjs [apps/extension/.wxt/registry-sources.mjs]
 */
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const { technologies } = await import(pathToFileURL(resolve(process.argv[2] ?? 'apps/extension/.wxt/registry-sources.mjs')).href);
const rules = technologies.flatMap((technology) => technology.rules
	.filter((rule) => (rule.kind === 'scriptSrc' || rule.kind === 'resourceUrl') && rule.pattern)
	.map((rule) => ({ owner: technology.id, rule, regex: new RegExp(rule.pattern.source, rule.pattern.flags.replace('g', '')) })));

const segments = (id) => id.split('-');
const related = (owner, other) => {
	if (owner === other) return true;
	const ownerParts = segments(owner);
	const otherParts = segments(other);
	return ownerParts.some((part) => otherParts.includes(part)) || other.startsWith(`${owner}`) && other.length === owner.length;
};

const hits = [];
for (const other of technologies) {
	if (!/^[a-z0-9-]{3,}$/.test(other.id)) continue;
	const urls = [`https://cdn.example.com/npm/${other.id}/dist/${other.id}.min.js`, `https://cdn.example.com/js/${other.id}.js`];
	for (const { owner, rule, regex } of rules) {
		if (related(owner, other.id)) continue;
		const url = urls.find((candidate) => regex.test(candidate));
		if (url) hits.push({ owner, ruleId: rule.id, pattern: rule.pattern.source, matchedFileOf: other.id });
	}
}

const byRule = new Map();
for (const hit of hits) byRule.set(hit.ruleId, { ...hit, matchedFileOf: [...(byRule.get(hit.ruleId)?.matchedFileOf ?? []), hit.matchedFileOf] });
const list = [...byRule.values()].sort((a, b) => b.matchedFileOf.length - a.matchedFileOf.length);
console.log(JSON.stringify({ rules: list.length, technologies: new Set(list.map((hit) => hit.owner)).size, list }, null, '\t'));
