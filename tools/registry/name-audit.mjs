/**
 * Report distinct technology ids that share a display name or website, which
 * usually means one product is defined twice (for example `solid` and `solidjs`).
 *
 * Usage: node tools/registry/name-audit.mjs [apps/extension/.wxt/registry-sources.mjs]
 */
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const { technologies } = await import(pathToFileURL(resolve(process.argv[2] ?? 'apps/extension/.wxt/registry-sources.mjs')).href);
const key = (value) => value.toLowerCase().replace(/\.js$|js$/, '').replace(/[^a-z0-9]+/g, '');
const site = (value) => value.toLowerCase().replace(/^https?:\/\/(?:www\.)?/, '').replace(/\/+$/, '');
const group = (fn) => {
	const map = new Map();
	for (const technology of technologies) map.set(fn(technology), [...(map.get(fn(technology)) ?? []), technology.id]);
	return [...map].filter(([, ids]) => ids.length > 1).map(([k, ids]) => `${k}: ${ids.join(', ')}`);
};
const byName = group((technology) => key(technology.name));
const byWebsite = group((technology) => site(technology.website));
console.log(JSON.stringify({ sameName: byName.length, sameWebsite: byWebsite.length, byName, byWebsite }, null, '\t'));
