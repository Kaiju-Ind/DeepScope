/**
 * Consistency checks for the guidance that agents and people follow: the root `AGENTS.md`, the skills and guides in
 * `.agents/`, and the Kaiju project playbook in `docs/kaiju/`.
 *
 * The three sources route to each other. A route that points nowhere, a skill name that no skill owns, or a utility
 * source other than the vendored `@utils/*` packages makes the system quietly wrong, so each check returns findings and
 * a test fails on any of them:
 *
 * - {@link links}: every relative Markdown link resolves to a file or folder.
 * - {@link routes}: every skill named in a routing table exists, and every skill is routed from the pack's start page.
 * - {@link authority}: project sources and extension-specific guidance use the recorded public-build dependency
 *   contract. Shared handbook examples remain upstream examples, rather than installed dependencies.
 * - {@link reciprocal}: each playbook folder names the skills that carry out its work, and each of those skills links
 *   back to the folder.
 * - {@link prompts}: each task prompt names existing skills and playbook rules, and its copyable block carries them.
 *
 * Each check is a pure function of paths and text, so the tests need no repository. Ported from Kaiju-Ind/Crawl
 * `tools/lint/guidance.ts` (a00f0036d); the authority check is DeepScope's.
 *
 * @example
 * ```ts
 * import * as guidance from './guidance.ts';
 *
 * guidance.links('AGENTS.md', '[Start](.agents/START.md)', new Set(['AGENTS.md']));
 * // [{ rule: 'guidance/link', file: 'AGENTS.md', detail: '.agents/START.md' }]
 * ```
 *
 * @module
 */
import { posix } from 'node:path';

const { dirname, join, normalize } = posix;

/** One problem: the rule it breaks, the repository path it is in, and what was wrong. */
export interface Finding {
	readonly rule: string;
	readonly file: string;
	readonly detail: string;
}

/** The guidance files: the root instructions, the pack and the playbook. */
export const GUIDANCE = /^(AGENTS\.md|CLAUDE\.md|\.agents\/.+\.md|docs\/kaiju\/.+\.md)$/u;

/** Project-specific instructions bound to the current public source-build contract. */
export const PROJECT_GUIDANCE = /^(AGENTS\.md|CLAUDE\.md|\.agents\/skills\/(build-extensions|use-utils)\/.+\.md|docs\/kaiju\/(platforms\/.+|(?:project|procedures)\/extensions\/.+|profiles\/deepscope)\.md)$/u;

/** Every application, portable package, vendored package and tool source or manifest. */
export const SOURCES = /^((apps\/[^/]+\/)?package\.json|(apps\/[^/]+\/src|packages|utils|tools)\/.+\.(ts|tsx|mjs|json))$/u;

/**
 * The libraries that Okikio maintains outside Kaiju-Ind/Utils. Any other `@okikio/<name>` is either a utility package
 * under the wrong scope or a remembered name that does not exist.
 */
export const OKIKIO = new Set(['undent', 'observables', 'sparql', 'wikitext', 'opfs', 'rdf', 'mediad']);

/** A Markdown inline link or image: `[text](target)`. Reference-style links are not used in the guidance. */
const LINK = /!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/gu;

/** A fenced code block, whose text is an example rather than a link or a route. */
const FENCE = /^(```|~~~)[^\n]*\n[\s\S]*?^\1[ \t]*$/gmu;

/** A table header cell that names a column of skills. */
const SKILL_COLUMN = /^(skills?|capability|domain\/runtime companion|skills that carry it out)$/iu;

/** A skill name in backticks: one lower-case word, or several joined by dashes. */
const SKILL_NAME = /`([a-z]+(?:-[a-z]+)*)`/gu;

/** A package in the `@okikio` scope; `@okikio/*` (the whole scope) has no name and is not matched. */
const OKIKIO_PACKAGE = /@okikio\/([a-z][a-z0-9-]*)/gu;

/** A named package in the private upstream scope. `@kaiju-ind/*` (the scope itself) is not matched. */
const KAIJU_PACKAGE = /@kaiju-ind\/([a-z][a-z0-9-]*)/gu;

/** A vendored utility package, `@utils/<package>`; `@utils/*` is not matched. */
const UTILS_PACKAGE = /@utils\/([a-z][a-z0-9-]*)/gu;

/** The personal utility workspace, which is never an authority. */
const OKIKIO_UTILS = /\bokikio\/utils\b/u;

/** A playbook folder's README: `docs/kaiju/<folder>/README.md`. */
const PLAYBOOK_FOLDER = /^docs\/kaiju\/([a-z-]+)\/README\.md$/u;

/** The paragraph in which a playbook folder or a task prompt names its skills. */
const SKILLS_LINE = /^Skills: ((?:.+\n?)+)/mu;

/** The paragraph in which a task prompt links the playbook rules it follows. */
const RULES_LINE = /^Rules: ((?:.+\n?)+)/mu;

/** A numbered task prompt: `docs/kaiju/tasks/NN-*.md`, not its overview. */
const TASK_PROMPT = /^docs\/kaiju\/tasks\/(?!00-)\d{2}-[^/]+\.md$/u;

/** The copyable prompt: the first `text` fence of the file. */
const PROMPT = /^```text\n([\s\S]*?)^```[ \t]*$/mu;

/** A rule's short name in a link label, such as `E03`, `AE01` or `P07`. */
const RULE_ID = /^[A-Z]{1,2}\d{2}$/u;

/** Remove fenced code blocks, keeping line breaks so that nothing else moves. */
function prose(text: string): string {
	return text.replace(FENCE, (block) => block.replace(/[^\n]/gu, ' '));
}

/** Resolve a link target against the file that holds it, as a repository path. */
function resolve(file: string, target: string): string {
	return normalize(join(dirname(file), target.split('#')[0]!.split('?')[0]!));
}

/**
 * Find relative links that resolve to no file or folder in `paths`. External links, anchors and absolute paths are
 * not checked. A target may name a folder: any path below it counts.
 */
export function links(file: string, text: string, paths: ReadonlySet<string>): Finding[] {
	const found: Finding[] = [];
	for (const [, raw] of prose(text).matchAll(LINK)) {
		const target = raw!.split('#')[0]!.split('?')[0]!;
		if (!target || /^[a-z][a-z0-9+.-]*:/iu.test(target) || target.startsWith('/')) continue;
		const resolved = normalize(join(dirname(file), decodeURI(target))).replace(/\/$/u, '');
		if (resolved.startsWith('..')) {
			found.push({ rule: 'guidance/link', file, detail: target });
			continue;
		}
		if (!paths.has(resolved) && ![...paths].some((path) => path.startsWith(resolved + '/'))) {
			found.push({ rule: 'guidance/link', file, detail: target });
		}
	}
	return found;
}

/** The backticked skill names in every column whose header names skills, across all tables of a document. */
export function routed(text: string): string[] {
	const names: string[] = [];
	let columns: number[] = [];
	for (const line of prose(text).split('\n')) {
		if (!line.trimStart().startsWith('|')) {
			columns = [];
			continue;
		}
		const cells = line.trim().replace(/^\||\|$/gu, '').split('|').map((cell) => cell.trim());
		if (cells.every((cell) => /^:?-+:?$/u.test(cell))) continue;
		if (columns.length === 0 && !cells.some((cell) => cell.includes('`'))) {
			columns = cells.flatMap((cell, index) => SKILL_COLUMN.test(cell) ? [index] : []);
			continue;
		}
		for (const index of columns) {
			for (const [, name] of (cells[index] ?? '').matchAll(SKILL_NAME)) names.push(name!);
		}
	}
	return names;
}

/**
 * Find skill names in routing tables that no skill owns, and skills that the pack's start page never routes to.
 * `skills` holds the folder names under `.agents/skills/` that contain a `SKILL.md`.
 */
export function routes(documents: ReadonlyMap<string, string>, skills: ReadonlySet<string>, start: string): Finding[] {
	const found: Finding[] = [];
	for (const [file, text] of documents) {
		for (const name of new Set(routed(text))) {
			if (!skills.has(name)) found.push({ rule: 'guidance/skill', file, detail: name });
		}
	}
	const reached = new Set(Array.from(prose(documents.get(start) ?? '').matchAll(SKILL_NAME), ([, name]) => name!));
	for (const name of skills) {
		if (!reached.has(name)) found.push({ rule: 'guidance/unrouted', file: start, detail: name });
	}
	return found;
}

/**
 * Check a source or project-specific instruction against DeepScope's current dependency contract.
 *
 * The source-build ADR retains the recorded `@utils/*` closure until published releases can meet the reviewer
 * build contract. Callers select {@link SOURCES} and {@link PROJECT_GUIDANCE}; shared upstream guides still describe
 * published packages and are checked by the other guidance rules. `@okikio/*` names only an Okikio library. When
 * `vendored` is given, every `@utils/<package>` must name an actual package in the closure. Code examples within
 * project-specific instructions count because they teach the local import contract.
 */
export function authority(file: string, text: string, vendored?: ReadonlySet<string>): Finding[] {
	const found: Finding[] = [];
	for (const [, name] of text.matchAll(KAIJU_PACKAGE)) {
		found.push({ rule: 'guidance/kaiju-package', file, detail: `@kaiju-ind/${name}` });
	}
	for (const [, name] of text.matchAll(OKIKIO_PACKAGE)) {
		if (!OKIKIO.has(name!)) found.push({ rule: 'guidance/okikio-package', file, detail: `@okikio/${name}` });
	}
	if (OKIKIO_UTILS.test(text)) found.push({ rule: 'guidance/okikio-utils', file, detail: 'okikio/utils' });
	if (vendored) {
		for (const name of new Set(Array.from(text.matchAll(UTILS_PACKAGE), ([, name]) => name!))) {
			if (!vendored.has(name)) found.push({ rule: 'guidance/utils-package', file, detail: `@utils/${name}` });
		}
	}
	return found;
}

/**
 * Find playbook folders that name no skills, skills that do not exist, and skills that do not link back. A folder
 * names its skills on a `Skills:` line of its README. A skill links back when its `SKILL.md` has a link that resolves
 * into that folder, so a reader can go from the procedure to the method and from the method to the procedure.
 */
export function reciprocal(documents: ReadonlyMap<string, string>, skills: ReadonlySet<string>): Finding[] {
	const found: Finding[] = [];
	for (const [file, text] of documents) {
		const folder = PLAYBOOK_FOLDER.exec(file)?.[1];
		if (!folder) continue;
		const line = SKILLS_LINE.exec(prose(text))?.[1];
		if (!line) {
			found.push({ rule: 'guidance/playbook-skills', file, detail: `docs/kaiju/${folder}` });
			continue;
		}
		for (const [, name] of line.matchAll(SKILL_NAME)) {
			if (!skills.has(name!)) {
				found.push({ rule: 'guidance/skill', file, detail: name! });
				continue;
			}
			const skill = `.agents/skills/${name}/SKILL.md`;
			const back = Array.from(prose(documents.get(skill) ?? '').matchAll(LINK)).some(([, target]) =>
				resolve(skill, target!).startsWith(`docs/kaiju/${folder}/`)
			);
			if (!back) found.push({ rule: 'guidance/backlink', file: skill, detail: `docs/kaiju/${folder}` });
		}
	}
	return found;
}

/**
 * Find task prompts that would lose the playbook when copied. A prompt in `docs/kaiju/tasks/` must name existing
 * skills on a `Skills:` line and link playbook rules on a `Rules:` line, and its fenced `text` block, which is the part
 * that is copied into a session, must name each of those skills and rules, start from `AGENTS.md` and
 * `.agents/START.md`, and end at a `STOPPING POINT`.
 */
export function prompts(
	documents: ReadonlyMap<string, string>,
	skills: ReadonlySet<string>,
	paths: ReadonlySet<string>,
): Finding[] {
	const found: Finding[] = [];
	for (const [file, text] of documents) {
		if (!TASK_PROMPT.test(file)) continue;
		const outside = prose(text);
		const block = PROMPT.exec(text)?.[1];
		const named = Array.from((SKILLS_LINE.exec(outside)?.[1] ?? '').matchAll(SKILL_NAME), ([, name]) => name!);
		if (named.length === 0) found.push({ rule: 'guidance/prompt-skills', file, detail: 'Skills:' });
		const rules = Array.from((RULES_LINE.exec(outside)?.[1] ?? '').matchAll(LINK), ([label, target]) => ({
			id: /^\[([^\]]+)\]/u.exec(label)![1]!,
			target: resolve(file, target!),
		}));
		const valid = rules.filter((rule) =>
			RULE_ID.test(rule.id) && rule.target.startsWith('docs/kaiju/') && !rule.target.startsWith('docs/kaiju/tasks/') &&
			paths.has(rule.target)
		);
		if (valid.length === 0) found.push({ rule: 'guidance/prompt-rules', file, detail: 'Rules:' });
		if (!block) {
			found.push({ rule: 'guidance/prompt', file, detail: 'text fence' });
			continue;
		}
		for (const name of named) {
			if (!skills.has(name)) found.push({ rule: 'guidance/skill', file, detail: name });
			else if (!block.includes(`\`${name}\``)) found.push({ rule: 'guidance/prompt-skill', file, detail: name });
		}
		for (const rule of valid) {
			if (!block.includes(rule.id) || !block.includes(rule.target)) {
				found.push({ rule: 'guidance/prompt-rule', file, detail: rule.id });
			}
		}
		for (const required of ['AGENTS.md', '.agents/START.md', 'STOPPING POINT']) {
			if (!block.includes(required)) found.push({ rule: 'guidance/prompt', file, detail: required });
		}
	}
	return found;
}
