/**
 * Convert Intelligence Registry catalog files into DeepScope's authoring format.
 *
 * The two catalogs share one file layout (`catalog/<folder>/<technology>.ts`) and
 * the same rule objects. Only the record envelope differs:
 *
 *   Intelligence                         DeepScope
 *   import type { TechnologyEntry }      import type { TechnologyDefinition }
 *   export const fooEntry                export const fooTechnologyDefinition
 *   category: 'frontend', tags: [...]    categories: [...]
 *
 * Usage:
 *   node tools/registry/intelligence-convert.mjs --intelligence <packages/registry> --out <dir>
 *       Writes every converted file under <dir>/<folder>/<technology>.ts.
 *   node tools/registry/intelligence-convert.mjs --intelligence <packages/registry> --compare
 *       Prints which converted files are new, identical, or different from
 *       src/registry/technology/catalog, and which DeepScope files have no
 *       Intelligence counterpart.
 *
 * Intelligence-only fields (`names`, `profile`) are dropped and reported:
 * DeepScope's schema has no place for them, and detection does not read them.
 */
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { parseArgs } from 'node:util';

const { values: args } = parseArgs({
	options: {
		intelligence: { type: 'string', default: resolve('../Intelligence/packages/registry') },
		catalog: { type: 'string', default: resolve('apps/extension/src/registry/technology/catalog') },
		out: { type: 'string' },
		compare: { type: 'boolean', default: false },
		json: { type: 'string' },
	},
});

/**
 * Remove one top-level record property (`\n\t<field>: <value>,`) from source text.
 *
 * Values are object or array literals of plain strings, so bracket depth plus
 * quote tracking is enough to find where the value ends.
 */
export function removeTopLevelProperty(text, field) {
	const start = text.indexOf(`\n\t${field}: `);
	if (start === -1) return { text, removed: undefined };
	let index = start + field.length + 4;
	let depth = 0;
	let quote;
	for (; index < text.length; index += 1) {
		const char = text[index];
		if (quote) {
			if (char === '\\') index += 1;
			else if (char === quote) quote = undefined;
			continue;
		}
		if (char === "'" || char === '"' || char === '`') quote = char;
		else if (char === '{' || char === '[') depth += 1;
		else if (char === '}' || char === ']') depth -= 1;
		else if (char === ',' && depth === 0) break;
	}
	return { text: text.slice(0, start) + text.slice(index + 1), removed: text.slice(start + 1, index + 1) };
}

/**
 * Convert one Intelligence technology file's source text.
 *
 * `names` and `profile` have no DeepScope equivalent that detection reads, so
 * they are dropped. DeepScope's older `component` block (the same knowledge in
 * the earlier shape) is kept when the existing DeepScope file has one.
 */
export function convertEntrySource(source, existing) {
	let text = source
		.replace("import type { TechnologyEntry } from '#/entry.ts';", "import type { TechnologyDefinition } from '@/lib/detection/types';")
		.replace("import type * as entry from '#/entry.ts';", "import type { TechnologyDefinition } from '@/lib/detection/types';")
		.replace(/export const (\w+)Entry: (?:entry\.)?TechnologyEntry =/g, 'export const $1TechnologyDefinition: TechnologyDefinition =')
		.replace(/satisfies (?:entry\.)?TechnologyEntry\b/g, 'satisfies TechnologyDefinition')
		.replace(/\n\tcategory: '[a-z-]+',\n(?:[ \t]*\n)?\ttags: \[/g, '\n\tcategories: [');
	const dropped = [];
	for (const field of ['names', 'profile']) {
		const result = removeTopLevelProperty(text, field);
		if (result.removed) dropped.push(field);
		text = result.text;
	}
	const component = existing ? removeTopLevelProperty(existing, 'component').removed : undefined;
	if (component && dropped.includes('profile')) {
		const anchor = ['versioning', 'metadata', 'implies', 'requires', 'excludes'].map((field) => text.indexOf(`\n\t${field}: `)).filter((i) => i !== -1);
		const at = anchor.length ? Math.min(...anchor) : text.lastIndexOf('\n}');
		text = `${text.slice(0, at)}\n${component}${text.slice(at)}`;
	}
	const problems = [];
	if (/TechnologyEntry|from '#\/|\n\tcategory: |\n\ttags: /.test(text)) problems.push('unconverted-reference');
	return { text, dropped, problems };
}

async function technologyFiles(root) {
	const files = [];
	for (const folder of (await readdir(root, { withFileTypes: true })).filter((d) => d.isDirectory())) {
		for (const file of await readdir(join(root, folder.name))) {
			if (!file.endsWith('.ts') || file === 'mod.ts' || file === 'index.ts' || file.endsWith('.test.ts')) continue;
			files.push(`${folder.name}/${file}`);
		}
	}
	return files.sort();
}

const intelligenceCatalog = resolve(args.intelligence, 'catalog');
const intelFiles = (await technologyFiles(intelligenceCatalog)).filter((file) => !file.startsWith('enrichment/'));
const result = { added: [], changed: [], identical: [], deepscopeOnly: [], dropped: {}, problems: {} };

for (const file of intelFiles) {
	const target = join(args.catalog, file);
	const existing = existsSync(target) ? await readFile(target, 'utf8') : undefined;
	const { text, dropped, problems } = convertEntrySource(await readFile(join(intelligenceCatalog, file), 'utf8'), existing);
	if (dropped.length) result.dropped[file] = dropped;
	if (problems.length) result.problems[file] = problems;
	if (args.out) {
		await mkdir(dirname(join(args.out, file)), { recursive: true });
		await writeFile(join(args.out, file), text);
	}
	if (!args.compare) continue;
	if (existing === undefined) result.added.push(file);
	else if (existing === text) result.identical.push(file);
	else result.changed.push(file);
}

if (args.compare) {
	const intel = new Set(intelFiles);
	result.deepscopeOnly = (await technologyFiles(args.catalog)).filter((file) => !intel.has(file));
	console.log(JSON.stringify({
		added: result.added.length,
		changed: result.changed.length,
		identical: result.identical.length,
		deepscopeOnly: result.deepscopeOnly.length,
		withDroppedFields: Object.keys(result.dropped).length,
		problems: result.problems,
	}, null, '\t'));
	if (args.json) await writeFile(args.json, JSON.stringify(result, null, '\t'));
}
