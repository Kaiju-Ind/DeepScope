import { describe, expect, it } from 'vitest';

import type { TechnologyDefinition } from '@/lib/detection/types';
import {
	REGISTRY_COMPILER_ARTIFACT_VERSION,
	REGISTRY_SOURCE_SCHEMA_VERSION,
	compileTechnologyRegistry,
} from '@/lib/registry';

function makeRegistry(): TechnologyDefinition[] {
	return [
		{
			id: 'example-runtime',
			name: 'Example Runtime',
			website: 'https://runtime.example',
			categories: ['framework'],
			rules: [{ kind: 'scriptSrc', pattern: /runtime\.js/, confidence: 90 }],
		},
		{
			id: 'example-framework',
			name: 'Example Framework',
			website: 'https://framework.example',
			categories: ['framework'],
			rules: [
				{ kind: 'meta', key: 'generator', valuePattern: /Example Framework/, confidence: 90 },
				{ kind: 'dom', selector: '[data-example-framework]' },
			],
			implies: ['example-runtime'],
		},
	];
}

describe('registry compiler', () => {
	it('builds reusable artifacts from the current TypeScript registry shape', () => {
		const artifact = compileTechnologyRegistry({ technologies: makeRegistry() });

		expect(artifact.artifactVersion).toBe(REGISTRY_COMPILER_ARTIFACT_VERSION);
		expect(artifact.sourceSchemaVersion).toBe(REGISTRY_SOURCE_SCHEMA_VERSION);
		expect(artifact.technologies.map((technology) => technology.id)).toEqual([
			'example-runtime',
			'example-framework',
		]);
		expect(artifact.technologyMetadata).toEqual([
			expect.objectContaining({ id: 'example-runtime', ruleCount: 1, order: 0 }),
			expect.objectContaining({ id: 'example-framework', ruleCount: 2, order: 1 }),
		]);
		expect(artifact.patternTables).toMatchObject({
			scriptSrc: 1,
			meta: 1,
			dom: 1,
		});
		expect(artifact.matcherIndex).toMatchObject({ technologyCount: 2, ruleCount: 3 });
		expect(artifact.relationshipGraph.relationshipEdges).toEqual([
			{ kind: 'implies', sourceId: 'example-framework', targetId: 'example-runtime' },
		]);
		expect(artifact.collectionPlan).toMatchObject({
			selectorProbeList: ['[data-example-framework]'],
		});
		expect(artifact.diagnostics).toEqual([]);
	});

	it('creates source-map entries for technologies, rules, and relationships', () => {
		const artifact = compileTechnologyRegistry({ technologies: makeRegistry() });

		expect(artifact.sourceMap['technology:example-framework']).toEqual({
			artifactId: 'technology:example-framework',
			section: 'technology',
			sourceKind: 'typescript-definition',
			sourceLocator: 'technologies.example-framework',
			technologyId: 'example-framework',
		});
		expect(artifact.sourceMap['rule:example-framework:1']).toMatchObject({
			section: 'rule',
			technologyId: 'example-framework',
			ruleIndex: 1,
		});
		expect(artifact.sourceMap['relationship:implies:example-framework:example-runtime']).toMatchObject({
			section: 'relationship',
			relationshipKind: 'implies',
			relationshipTarget: 'example-runtime',
		});
	});

	it('reports duplicate technology ids as compiler diagnostics', () => {
		const artifact = compileTechnologyRegistry({
			technologies: [makeRegistry()[0]!, makeRegistry()[0]!],
		});

		expect(artifact.diagnostics).toContainEqual(
			expect.objectContaining({
				severity: 'error',
				code: 'technology.duplicate_id',
				location: expect.objectContaining({ technologyId: 'example-runtime' }),
			}),
		);
	});

	it('reports unknown relationship targets as compiler diagnostics', () => {
		const registry = makeRegistry();
		registry[1] = {
			...registry[1]!,
			requires: ['missing-runtime'],
		};

		const artifact = compileTechnologyRegistry({ technologies: registry });

		expect(artifact.diagnostics).toContainEqual(
			expect.objectContaining({
				severity: 'error',
				code: 'relationship.unknown_target',
				message: 'Technology "example-framework" requires unknown technology "missing-runtime".',
			}),
		);
	});

	it('warns about duplicate rule ids inside one technology', () => {
		const registry = makeRegistry();
		registry[0] = {
			...registry[0]!,
			rules: [
				{ kind: 'scriptSrc', id: 'runtime-script', pattern: /runtime\.js/ },
				{ kind: 'scriptSrc', id: 'runtime-script', pattern: /runtime-v2\.js/ },
			],
		};

		const artifact = compileTechnologyRegistry({ technologies: registry });

		expect(artifact.diagnostics).toContainEqual(
			expect.objectContaining({
				severity: 'warning',
				code: 'rule.duplicate_id',
				location: expect.objectContaining({ technologyId: 'example-runtime', ruleIndex: 1 }),
			}),
		);
	});

	it('returns an empty artifact with schema diagnostics for malformed sources', () => {
		const artifact = compileTechnologyRegistry({
			technologies: [
				{
					id: 'broken',
					name: 'Broken',
					website: 'https://broken.example',
					categories: ['framework'],
					rules: [{ kind: 'cookie' }],
				} as TechnologyDefinition,
			],
		});

		expect(artifact.technologies).toEqual([]);
		expect(artifact.matcherIndex).toMatchObject({ technologyCount: 0, ruleCount: 0 });
		expect(artifact.diagnostics).toContainEqual(
			expect.objectContaining({ code: 'schema.invalid' }),
		);
	});
});
