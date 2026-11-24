/**
 * Report relationship targets (`implies`, `requires`, `excludes`) that name no
 * technology in the registry, and technologies that imply themselves.
 *
 * Usage: node scripts/registry/relation-audit.mjs [.wxt/registry-sources.mjs]
 */
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const { technologies } = await import(pathToFileURL(resolve(process.argv[2] ?? '.wxt/registry-sources.mjs')).href);
const ids = new Set(technologies.map((technology) => technology.id));
const dangling = [];
const selfEdges = [];
for (const technology of technologies) {
	for (const relation of ['implies', 'requires', 'excludes']) {
		for (const target of technology[relation] ?? []) {
			if (!ids.has(target)) dangling.push(`${technology.id} ${relation} ${target}`);
			if (target === technology.id) selfEdges.push(`${technology.id} ${relation} ${target}`);
		}
	}
}
console.log(JSON.stringify({ dangling: dangling.length, selfEdges: selfEdges.length, danglingEdges: dangling, selfEdgeList: selfEdges }, null, '\t'));
