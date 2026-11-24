/**
 * Compare DeepScope's technology catalog with the Intelligence Registry catalog.
 *
 * Both catalogs descend from the same Wappalyzer-derived technology data and use
 * nearly the same rule shapes, but different record shapes:
 *
 *   DeepScope `TechnologyDefinition`  categories[], component, relationships
 *   Intelligence `TechnologyEntry`    category + tags[], names, profile, versioning
 *
 * The script bundles each catalog with Rolldown (type-only imports vanish), merges
 * duplicate-id fragments the way each repository does, normalizes every record
 * into one comparable shape, and writes a Markdown report plus a JSON dump.
 *
 * Usage:
 *   node scripts/registry/intelligence-diff.mjs \
 *     [--intelligence ../Intelligence/packages/registry] \
 *     [--out <report.md>] [--json <diff.json>]
 *
 * Point `--intelligence` at any checkout or `git archive` export of
 * `packages/registry`. Nothing is written into either catalog.
 */
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import { rolldown } from 'rolldown';

const { values: args } = parseArgs({
	options: {
		intelligence: { type: 'string', default: resolve('../Intelligence/packages/registry') },
		deepscope: { type: 'string', default: resolve('.') },
		out: { type: 'string' },
		json: { type: 'string' },
	},
});

const RELATION_FIELDS = ['implies', 'requires', 'excludes'];
const PATTERN_FIELDS = ['pattern', 'valuePattern', 'keyPattern', 'hrefPattern', 'typePattern', 'hreflangPattern', 'mediaPattern'];
const PLAIN_FIELDS = ['selector', 'attribute', 'property', 'key', 'rel', 'as', 'recordType', 'area'];

async function bundle(input, alias, exportsSource) {
	const dir = await mkdtemp(join(tmpdir(), 'registry-diff-'));
	try {
		const entry = join(dir, 'entry.ts');
		await writeFile(entry, exportsSource(input));
		const build = await rolldown({ input: entry, platform: 'node', logLevel: 'silent', tsconfig: false, resolve: { alias } });
		const { output } = await build.generate({ format: 'esm' });
		await build.close();
		const file = join(dir, 'bundle.mjs');
		await writeFile(file, output[0].code);
		return await import(pathToFileURL(file).href);
	} finally {
		await rm(dir, { recursive: true, force: true });
	}
}

async function loadDeepScope(root) {
	const mod = await bundle(
		resolve(root, 'src/registry/technology/index.ts'),
		{ '@': resolve(root, 'src'), '~': resolve(root, 'src') },
		(input) => `export { technologyDefinitionsByCategory, generatedTechnologyDefinitions } from ${JSON.stringify(input)};`,
	);
	const fragments = Object.entries(mod.technologyDefinitionsByCategory).flatMap(([folder, list]) => list.map((entry) => ({ folder, entry })));
	return { fragments, merged: mod.generatedTechnologyDefinitions };
}

async function loadIntelligence(root) {
	const mod = await bundle(
		resolve(root, 'catalog/mod.ts'),
		{ '#': root },
		(input) => `export { byTag } from ${JSON.stringify(input)};\nexport { merge } from ${JSON.stringify(resolve(root, 'merge.ts'))};`,
	);
	const fragments = Object.entries(mod.byTag).flatMap(([folder, list]) => list.map((entry) => ({ folder, entry })));
	return { fragments, merged: mod.merge(fragments.map(({ entry }) => entry)) };
}

const stable = (value) => (value === undefined ? undefined : JSON.stringify(value, Object.keys(value).sort()));
const regex = (value) => (value ? `/${value.source}/${value.flags}` : undefined);
const target = (value) => (typeof value === 'string' ? value : value.version ? `${value.id}@${JSON.stringify(value.version)}` : value.id);

/** Structural rule signature: ignores rule ids, descriptions, and confidence. */
function ruleSignature(rule) {
	const parts = [rule.kind];
	for (const field of PLAIN_FIELDS) if (rule[field] !== undefined) parts.push(`${field}=${rule[field]}`);
	for (const field of PATTERN_FIELDS) if (rule[field]) parts.push(`${field}=${regex(rule[field])}`);
	return parts.join(' ');
}

function ruleDetail(rule) {
	const version = rule.version ? ` version=${JSON.stringify({ ...rule.version, pattern: regex(rule.version.pattern) })}` : '';
	const confidence = rule.confidence !== undefined ? ` confidence=${rule.confidence}` : '';
	return `${ruleSignature(rule)}${confidence}${version}`;
}

function normalizeDeepScope(entry) {
	return {
		id: entry.id,
		name: entry.name,
		website: entry.website,
		description: entry.description,
		icon: entry.icon,
		cpe: entry.metadata?.cpe,
		categories: [...entry.categories].sort(),
		rules: entry.rules.map(ruleDetail),
		implies: (entry.implies ?? []).map(target).sort(),
		requires: (entry.requires ?? []).map(target).sort(),
		excludes: (entry.excludes ?? []).map(target).sort(),
		metadata: stable(entry.metadata),
		versioning: stable(entry.versioning),
		extraFields: Object.keys(entry).filter((key) => !DEEPSCOPE_FIELDS.has(key)),
	};
}

function normalizeIntelligence(entry) {
	return {
		id: entry.id,
		name: entry.name,
		website: entry.website,
		description: entry.description,
		icon: entry.icon,
		cpe: entry.metadata?.cpe,
		// Intelligence `tags` carry the fine-grained ids that DeepScope calls categories.
		categories: [...entry.tags].sort(),
		broadCategory: entry.category,
		rules: entry.rules.map(ruleDetail),
		implies: (entry.implies ?? []).map(target).sort(),
		requires: (entry.requires ?? []).map(target).sort(),
		excludes: (entry.excludes ?? []).map(target).sort(),
		metadata: stable(entry.metadata),
		versioning: stable(entry.versioning),
		extraFields: Object.keys(entry).filter((key) => !INTELLIGENCE_FIELDS.has(key)),
	};
}

const SHARED = ['id', 'name', 'website', 'description', 'icon', 'rules', 'implies', 'requires', 'excludes', 'priority', 'versioning', 'metadata'];
const DEEPSCOPE_FIELDS = new Set([...SHARED, 'categories']);
const INTELLIGENCE_FIELDS = new Set([...SHARED, 'category', 'tags']);

function setDiff(a, b) {
	const right = new Set(b);
	return a.filter((value) => !right.has(value));
}

function fieldCounts(entries) {
	const counts = {};
	for (const entry of entries) for (const key of Object.keys(entry)) counts[key] = (counts[key] ?? 0) + 1;
	return counts;
}

function duplicateIds(fragments) {
	const byId = new Map();
	for (const { folder, entry } of fragments) byId.set(entry.id, [...(byId.get(entry.id) ?? []), folder]);
	return [...byId].filter(([, folders]) => folders.length > 1);
}

const nameKey = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '');

const [deepscope, intelligence] = await Promise.all([loadDeepScope(resolve(args.deepscope)), loadIntelligence(resolve(args.intelligence))]);
const ds = new Map(deepscope.merged.map((entry) => [entry.id, normalizeDeepScope(entry)]));
const intel = new Map(intelligence.merged.map((entry) => [entry.id, normalizeIntelligence(entry)]));

const added = [...intel.keys()].filter((id) => !ds.has(id)).sort();
const removed = [...ds.keys()].filter((id) => !intel.has(id)).sort();

// Renames: an added and a removed id with the same normalized name or website.
const removedByName = new Map(removed.map((id) => [nameKey(ds.get(id).name), id]));
const removedByWebsite = new Map(removed.filter((id) => ds.get(id).website).map((id) => [ds.get(id).website.replace(/\/$/, ''), id]));
const renamed = [];
for (const id of added) {
	const entry = intel.get(id);
	const from = removedByName.get(nameKey(entry.name)) ?? removedByWebsite.get(entry.website?.replace(/\/$/, ''));
	if (from) renamed.push({ from, to: id, name: entry.name, by: removedByName.get(nameKey(entry.name)) ? 'name' : 'website' });
}

const changed = [];
for (const [id, left] of ds) {
	const right = intel.get(id);
	if (!right) continue;
	const change = { id };
	const leftRules = new Set(left.rules.map((rule) => rule));
	const rightRules = new Set(right.rules.map((rule) => rule));
	const rulesAdded = [...rightRules].filter((rule) => !leftRules.has(rule));
	const rulesRemoved = [...leftRules].filter((rule) => !rightRules.has(rule));
	if (rulesAdded.length || rulesRemoved.length) change.rules = { added: rulesAdded, removed: rulesRemoved };
	for (const field of RELATION_FIELDS) {
		const plus = setDiff(right[field], left[field]);
		const minus = setDiff(left[field], right[field]);
		if (plus.length || minus.length) change[field] = { added: plus, removed: minus };
	}
	const catPlus = setDiff(right.categories, left.categories);
	const catMinus = setDiff(left.categories, right.categories);
	if (catPlus.length || catMinus.length) change.categories = { added: catPlus, removed: catMinus };
	for (const field of ['name', 'website', 'description', 'icon', 'cpe', 'metadata', 'versioning']) {
		if ((left[field] ?? null) !== (right[field] ?? null)) change[field] = { from: left[field] ?? null, to: right[field] ?? null };
	}
	if (Object.keys(change).length > 1) changed.push(change);
}

const count = (predicate) => changed.filter(predicate).length;
const summary = {
	deepscope: { fragments: deepscope.fragments.length, technologies: ds.size, rules: [...ds.values()].reduce((n, t) => n + t.rules.length, 0), duplicateIds: duplicateIds(deepscope.fragments).length },
	intelligence: { fragments: intelligence.fragments.length, technologies: intel.size, rules: [...intel.values()].reduce((n, t) => n + t.rules.length, 0), duplicateIds: duplicateIds(intelligence.fragments).length },
	added: added.length,
	removed: removed.length,
	renamedCandidates: renamed.length,
	changedTechnologies: changed.length,
	withRuleChanges: count((c) => c.rules),
	rulesAdded: changed.reduce((n, c) => n + (c.rules?.added.length ?? 0), 0),
	rulesRemoved: changed.reduce((n, c) => n + (c.rules?.removed.length ?? 0), 0),
	withRelationshipChanges: count((c) => RELATION_FIELDS.some((f) => c[f])),
	withCategoryChanges: count((c) => c.categories),
	withNameChanges: count((c) => c.name),
	withWebsiteChanges: count((c) => c.website),
	withDescriptionChanges: count((c) => c.description),
	withIconChanges: count((c) => c.icon),
	withCpeChanges: count((c) => c.cpe),
	withMetadataChanges: count((c) => c.metadata),
	withVersioningChanges: count((c) => c.versioning),
};

const schema = {
	deepscopeFieldCounts: fieldCounts(deepscope.merged),
	intelligenceFieldCounts: fieldCounts(intelligence.merged),
	intelligenceBroadCategories: Object.fromEntries([...intel.values()].reduce((m, t) => m.set(t.broadCategory, (m.get(t.broadCategory) ?? 0) + 1), new Map())),
	intelligenceProfileKeys: fieldCounts(intelligence.merged.map((t) => t.profile ?? {})),
	deepscopeComponentKeys: fieldCounts(deepscope.merged.map((t) => t.component ?? {})),
	intelligenceTagsNotDeepscopeCategories: [...new Set([...intel.values()].flatMap((t) => t.categories))].filter((tag) => !new Set([...ds.values()].flatMap((t) => t.categories)).has(tag)),
	intelligenceTargetObjects: [...intel.values()].filter((t) => RELATION_FIELDS.some((f) => t[f].some((v) => v.includes('@')))).map((t) => t.id),
};

const list = (values, limit = Infinity) => {
	const shown = values.slice(0, limit).map((v) => `\`${v}\``).join(', ');
	return values.length > limit ? `${shown}, ... (${values.length - limit} more)` : shown || '(none)';
};

const lines = [];
lines.push('# DeepScope vs Intelligence registry diff', '');
lines.push('Generated by `scripts/registry/intelligence-diff.mjs`. Rules compare by structure (kind, selector/key/property, patterns, confidence, version); rule ids and descriptions are ignored.', '');
lines.push('## Summary', '', '```json', JSON.stringify(summary, null, 2), '```', '');
lines.push('## Schema differences', '', '```json', JSON.stringify(schema, null, 2), '```', '');
lines.push(`## Added in Intelligence (${added.length})`, '');
for (const id of added) { const t = intel.get(id); lines.push(`- \`${id}\` ${t.name} [${t.categories.join(', ')}] ${t.rules.length} rules${t.implies.length ? `, implies ${list(t.implies)}` : ''}`); }
lines.push('', `## Removed in Intelligence (${removed.length})`, '');
for (const id of removed) { const t = ds.get(id); lines.push(`- \`${id}\` ${t.name} [${t.categories.join(', ')}] ${t.rules.length} rules`); }
lines.push('', `## Rename candidates (${renamed.length})`, '');
for (const r of renamed) lines.push(`- \`${r.from}\` -> \`${r.to}\` (${r.name}, matched by ${r.by})`);
lines.push('', `## Changed technologies (${changed.length})`, '');
for (const c of changed) {
	lines.push(`### \`${c.id}\``);
	for (const field of ['name', 'website', 'description', 'icon', 'cpe', 'metadata', 'versioning']) if (c[field]) lines.push(`- ${field}: ${JSON.stringify(c[field].from)} -> ${JSON.stringify(c[field].to)}`);
	if (c.categories) lines.push(`- categories: +${list(c.categories.added)} -${list(c.categories.removed)}`);
	for (const field of RELATION_FIELDS) if (c[field]) lines.push(`- ${field}: +${list(c[field].added)} -${list(c[field].removed)}`);
	if (c.rules) {
		for (const rule of c.rules.removed) lines.push(`- rule -: \`${rule}\``);
		for (const rule of c.rules.added) lines.push(`- rule +: \`${rule}\``);
	}
	lines.push('');
}

if (args.out) await writeFile(resolve(args.out), `${lines.join('\n')}\n`);
if (args.json) await writeFile(resolve(args.json), JSON.stringify({ summary, schema, added, removed, renamed, changed }, null, '\t'));
console.log(JSON.stringify(summary, null, '\t'));
