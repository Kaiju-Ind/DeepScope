import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import * as guidance from './guidance.ts';

const root = fileURLToPath(new URL('../../', import.meta.url));

/** Folders that hold installed, generated or local-only files, never guidance or sources. */
const SKIPPED = new Set(['.git', 'node_modules', '.output', '.wxt', '.tmp', '.claude', '.pnpm-store']);

/** Every file and folder below the root, as repository paths. Ignored and generated folders are skipped. */
function walk(folder = ''): string[] {
	const found: string[] = [];
	for (const entry of readdirSync(`${root}${folder}`, { withFileTypes: true })) {
		if (SKIPPED.has(entry.name)) continue;
		const path = `${folder}${entry.name}`;
		if (entry.isDirectory()) found.push(path, ...walk(`${path}/`));
		else if (entry.isFile()) found.push(path);
	}
	return found;
}

const paths = new Set(walk());
const read = (path: string) => readFileSync(`${root}${path}`, 'utf8');
const documents = new Map(
	[...paths].filter((path) => guidance.GUIDANCE.test(path)).sort().map((path) => [path, read(path)] as const),
);
const skills = new Set(
	[...paths].flatMap((path) => /^\.agents\/skills\/([^/]+)\/SKILL\.md$/u.exec(path)?.[1] ?? []),
);
const vendored = new Set([...paths].flatMap((path) => /^utils\/([^/]+)\/package\.json$/u.exec(path)?.[1] ?? []));

describe('guidance links', () => {
	it('resolve files and folders relative to the document, and skip external links and examples', () => {
		const known = new Set(['docs/kaiju/README.md', 'docs/kaiju/start/README.md', '.agents/START.md']);
		const text = [
			'[Start](start/README.md) [Folder](start/) [Pack](../../.agents/START.md#select)',
			'[Web](https://example.com) [Anchor](#here) [Missing](start/gone.md)',
			'```md',
			'[Example](not-checked.md)',
			'```',
		].join('\n');
		expect(guidance.links('docs/kaiju/README.md', text, known)).toEqual([
			{ rule: 'guidance/link', file: 'docs/kaiju/README.md', detail: 'start/gone.md' },
		]);
	});

	it('all resolve in this repository', () => {
		const found = [...documents].flatMap(([file, text]) => guidance.links(file, text, paths));
		expect(found).toEqual([]);
	});
});

describe('guidance routes', () => {
	it('read skill names from skill columns only', () => {
		const text = [
			'| Decision | Skill | Playbook |',
			'| --- | --- | --- |',
			'| Tests | `test-code`, `benchmark-code` | `not-a-skill` |',
			'',
			'| Name | Value |',
			'| --- | --- |',
			'| `build-extensions` | x |',
		].join('\n');
		expect(guidance.routed(text)).toEqual(['test-code', 'benchmark-code']);
	});

	it('find unknown skills and skills that the start page never routes to', () => {
		const docs = new Map([
			['AGENTS.md', '| Decision | Skill |\n| --- | --- |\n| Builds | `build-devtools`, `build-apis` |\n'],
			['.agents/START.md', '| Requested work | Capability |\n| --- | --- |\n| Builds | `build-devtools` |\n'],
		]);
		expect(guidance.routes(docs, new Set(['build-devtools', 'test-code']), '.agents/START.md')).toEqual([
			{ rule: 'guidance/skill', file: 'AGENTS.md', detail: 'build-apis' },
			{ rule: 'guidance/unrouted', file: '.agents/START.md', detail: 'test-code' },
		]);
	});

	it('all point to existing skills, and every skill is routed, in this repository', () => {
		expect(skills.size).toBeGreaterThan(0);
		expect(guidance.routes(documents, skills, '.agents/START.md')).toEqual([]);
	});
});

describe('utility authority', () => {
	it('rejects private packages, unknown Okikio names and unvendored @utils packages', () => {
		const text = [
			"import { ok } from '@kaiju-ind/result'; the upstream scope `@kaiju-ind/*` is fine;",
			"'@okikio/observables'; `@okikio/*`; '@okikio/server'; okikio/utils;",
			"'@utils/result'; '@utils/query'; `@utils/*`",
		].join('\n');
		expect(guidance.authority('a.md', text, new Set(['result']))).toEqual([
			{ rule: 'guidance/kaiju-package', file: 'a.md', detail: '@kaiju-ind/result' },
			{ rule: 'guidance/okikio-package', file: 'a.md', detail: '@okikio/server' },
			{ rule: 'guidance/okikio-utils', file: 'a.md', detail: 'okikio/utils' },
			{ rule: 'guidance/utils-package', file: 'a.md', detail: '@utils/query' },
		]);
	});

	it('holds for the guidance in this repository, whose @utils packages are all vendored', () => {
		expect(vendored.has('result')).toBe(true);
		const found = [...documents].flatMap(([file, text]) => guidance.authority(file, text, vendored));
		expect(found).toEqual([]);
	});

	it('holds for the sources and manifests of this repository', () => {
		const self = new Set(['tools/lint/guidance.ts', 'tools/lint/guidance.test.ts']);
		const found = [...paths]
			.filter((path) => guidance.SOURCES.test(path) && !self.has(path))
			.flatMap((file) => guidance.authority(file, read(file)));
		expect(found).toEqual([]);
	});
});

describe('playbook and skills', () => {
	it('finds a folder with no skills, an unknown skill and a skill without a link back', () => {
		const docs = new Map([
			['docs/kaiju/engineering/README.md', '# Engineering\n\nSkills: `test-code`, `build-nothing`.\n'],
			['docs/kaiju/handbook/README.md', '# Handbook\n'],
			['docs/kaiju/procedures/README.md', '# Procedures\n\nSkills: `review-code`.\n'],
			['.agents/skills/test-code/SKILL.md', '# Test\n'],
			['.agents/skills/review-code/SKILL.md', '[Procedures](../../../docs/kaiju/procedures/README.md)'],
		]);
		expect(guidance.reciprocal(docs, new Set(['test-code', 'review-code']))).toEqual([
			{ rule: 'guidance/backlink', file: '.agents/skills/test-code/SKILL.md', detail: 'docs/kaiju/engineering' },
			{ rule: 'guidance/skill', file: 'docs/kaiju/engineering/README.md', detail: 'build-nothing' },
			{ rule: 'guidance/playbook-skills', file: 'docs/kaiju/handbook/README.md', detail: 'docs/kaiju/handbook' },
		]);
	});

	it('link both ways in this repository', () => {
		expect(guidance.reciprocal(documents, skills)).toEqual([]);
	});
});

describe('task prompts', () => {
	const rule = 'docs/kaiju/engineering/03-e03-cache.md';
	const prompt = (
		block: string,
		skills = 'Skills: `test-code`.',
		rules = `Rules: [E03](../engineering/03-e03-cache.md).`,
	) => `# T01 Task\n\n${skills}\n\n${rules}\n\n\`\`\`text\n${block}\n\`\`\`\n`;
	const complete = `Read AGENTS.md and .agents/START.md. Load \`test-code\`. Follow E03 (${rule}).\nSTOPPING POINT`;

	it('accept a prompt whose copied block carries its skills and rules', () => {
		const docs = new Map([['docs/kaiju/tasks/01-t01-task.md', prompt(complete)]]);
		expect(guidance.prompts(docs, new Set(['test-code']), new Set([rule]))).toEqual([]);
	});

	it('find missing lines, unknown skills and a block that would lose them', () => {
		const file = 'docs/kaiju/tasks/01-t01-task.md';
		const docs = new Map([
			[file, prompt('Load nothing.', 'Skills: `test-code`, `build-nothing`.')],
			['docs/kaiju/tasks/02-t02-bare.md', '# T02\n'],
			['docs/kaiju/tasks/00-overview.md', '# Overview\n'],
		]);
		expect(guidance.prompts(docs, new Set(['test-code']), new Set([rule]))).toEqual([
			{ rule: 'guidance/prompt-skill', file, detail: 'test-code' },
			{ rule: 'guidance/skill', file, detail: 'build-nothing' },
			{ rule: 'guidance/prompt-rule', file, detail: 'E03' },
			{ rule: 'guidance/prompt', file, detail: 'AGENTS.md' },
			{ rule: 'guidance/prompt', file, detail: '.agents/START.md' },
			{ rule: 'guidance/prompt', file, detail: 'STOPPING POINT' },
			{ rule: 'guidance/prompt-skills', file: 'docs/kaiju/tasks/02-t02-bare.md', detail: 'Skills:' },
			{ rule: 'guidance/prompt-rules', file: 'docs/kaiju/tasks/02-t02-bare.md', detail: 'Rules:' },
			{ rule: 'guidance/prompt', file: 'docs/kaiju/tasks/02-t02-bare.md', detail: 'text fence' },
		]);
	});

	it('reject rules that are not playbook rules', () => {
		const docs = new Map([[
			'docs/kaiju/tasks/01-t01-task.md',
			prompt(complete, undefined, 'Rules: [notes](../tasks/README.md).'),
		]]);
		expect(guidance.prompts(docs, new Set(['test-code']), new Set([rule, 'docs/kaiju/tasks/README.md']))).toEqual([
			{ rule: 'guidance/prompt-rules', file: 'docs/kaiju/tasks/01-t01-task.md', detail: 'Rules:' },
		]);
	});

	it('carry their skills and rules in this repository', () => {
		expect(guidance.prompts(documents, skills, paths)).toEqual([]);
	});
});
