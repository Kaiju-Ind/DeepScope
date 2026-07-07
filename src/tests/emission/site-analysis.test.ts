import { fc, test } from '@fast-check/vitest';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/detection/rules', () => ({
	SOURCE_LIMITS: { evidenceValueChars: 160 },
}));

import type { PageSignals, SiteAnalysis, TechnologyDefinition } from '@/lib/detection/types';
import { createEvidenceCandidateBatch, refineEvidenceCandidateBatch } from '@/lib/candidates';
import { analyzeSite } from '@/lib/detection/engine';
import { createCompiledDetectionRegistry } from '@/lib/detection/registry-graph';
import { matchObservationBatch } from '@/lib/detection/observation-matcher';
import { emitSiteAnalysisFromRefinedCandidates } from '@/lib/emission';
import { normalizePageSignals } from '@/lib/observations';
import { makePageSignals, TEST_NOW } from '../support/factories';

function makeTechnology(
	overrides: Partial<TechnologyDefinition> & Pick<TechnologyDefinition, 'id'>,
): TechnologyDefinition {
	return {
		...overrides,
		id: overrides.id,
		name: overrides.name ?? overrides.id,
		website: overrides.website ?? `https://${overrides.id}.example`,
		categories: overrides.categories ?? ['framework'],
		rules: overrides.rules ?? [],
	};
}

function analyzeViaCandidatePipeline(
	signals: PageSignals,
	registry: TechnologyDefinition[],
): SiteAnalysis {
	const observations = normalizePageSignals(signals, { observedAt: signals.collectedAt });
	const matches = matchObservationBatch({ registry, batch: observations });
	const candidates = createEvidenceCandidateBatch({ registry, evidence: matches.evidenceBatch });
	const refined = refineEvidenceCandidateBatch({
		batch: candidates,
		compiledRegistry: createCompiledDetectionRegistry(registry),
	});

	return emitSiteAnalysisFromRefinedCandidates({
		batch: refined,
		analyzedAt: TEST_NOW,
	}).analysis;
}

function expectPipelineParity(signals: PageSignals, registry: TechnologyDefinition[]): void {
	vi.setSystemTime(TEST_NOW);
	expect(analyzeViaCandidatePipeline(signals, registry)).toEqual(analyzeSite(signals, registry));
}

describe('final detection emission', () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it('emits SiteAnalysis-compatible output and filters candidates below the display threshold', () => {
		const registry = [
			makeTechnology({ id: 'weak', rules: [{ kind: 'scriptSrc', pattern: /weak/i, confidence: 40 }] }),
			makeTechnology({ id: 'strong', rules: [{ kind: 'scriptSrc', pattern: /strong/i, confidence: 90 }] }),
		];
		const signals = makePageSignals({
			scripts: [
				'https://cdn.example.com/weak.js',
				'https://cdn.example.com/strong.js',
			],
		});
		const observations = normalizePageSignals(signals);
		const matches = matchObservationBatch({ registry, batch: observations });
		const candidates = createEvidenceCandidateBatch({ registry, evidence: matches.evidenceBatch });
		const refined = refineEvidenceCandidateBatch({
			batch: candidates,
			compiledRegistry: createCompiledDetectionRegistry(registry),
		});

		const emitted = emitSiteAnalysisFromRefinedCandidates({ batch: refined, analyzedAt: TEST_NOW });

		expect(emitted.analysis).toEqual({
			url: 'https://example.com/products',
			hostname: 'example.com',
			analyzedAt: TEST_NOW,
			source: 'fresh',
			results: [expect.objectContaining({ technologyId: 'strong' })],
			errors: [],
		});
		expect(emitted.metadata).toEqual({
			candidateCount: 2,
			emittedResultCount: 1,
			filteredCandidateCount: 1,
			rejectionCount: 0,
			relationshipEvidenceCount: 0,
		});
	});

	it('matches analyzeSite for direct evidence confidence versions and result order', () => {
		const registry = [
			makeTechnology({
				id: 'react',
				name: 'React',
				website: 'https://react.dev',
				categories: ['ui-library'],
				rules: [
					{
						kind: 'scriptSrc',
						pattern: /react(?:\.production)?(?:\.min)?\.js\?v=([\d.]+)/i,
						confidence: 70,
						description: 'React asset URL',
						version: { source: 'match', group: 1 },
					},
					{ kind: 'meta', key: 'generator', valuePattern: /React App/i, confidence: 40 },
				],
			}),
			makeTechnology({
				id: 'vite',
				name: 'Vite',
				website: 'https://vite.dev',
				categories: ['bundler'],
				rules: [{ kind: 'scriptSrc', pattern: /vite\/client/i, confidence: 85 }],
			}),
		];
		const signals = makePageSignals({
			scripts: [
				'https://cdn.example.com/react.production.min.js?v=18.3.1',
				'https://example.com/@vite/client',
			],
			meta: { generator: ['React App'] },
		});

		expectPipelineParity(signals, registry);
	});

	it('matches analyzeSite for requirements implications and exclusions', () => {
		const registry = [
			makeTechnology({
				id: 'wordpress',
				name: 'WordPress',
				website: 'https://wordpress.org',
				categories: ['platform-cms-builder'],
				rules: [{ kind: 'meta', key: 'generator', valuePattern: /WordPress/i, confidence: 95 }],
			}),
			makeTechnology({
				id: 'blocksy',
				name: 'Blocksy',
				website: 'https://creativethemes.com/blocksy/',
				categories: ['wordpress-ecosystem'],
				rules: [{ kind: 'stylesheetHref', pattern: /blocksy/i, confidence: 80 }],
				requires: ['wordpress'],
				implies: ['woocommerce'],
			}),
			makeTechnology({
				id: 'woocommerce',
				name: 'WooCommerce',
				website: 'https://woocommerce.com',
				categories: ['ecommerce-extensions'],
				rules: [],
			}),
			makeTechnology({
				id: 'wix',
				name: 'Wix',
				website: 'https://wix.com',
				categories: ['platform-cms-builder'],
				rules: [{ kind: 'scriptSrc', pattern: /wix/i, confidence: 75 }],
				excludes: ['wordpress'],
			}),
		];
		const signals = makePageSignals({
			meta: { generator: ['WordPress 6.5'] },
			stylesheets: ['https://example.com/wp-content/themes/blocksy/style.css'],
			scripts: ['https://static.wixstatic.com/app.js'],
		});

		expectPipelineParity(signals, registry);
	});

	test.prop([
		fc.integer({ min: 0, max: 49 }),
	], { numRuns: 25 })(
		'keeps sub-threshold direct candidates out of emitted SiteAnalysis results',
		(confidence) => {
			const registry = [makeTechnology({
				id: 'weak-tech',
				rules: [{ kind: 'scriptSrc', pattern: /weak-tech/i, confidence }],
			})];
			const signals = makePageSignals({ scripts: ['https://cdn.example.com/weak-tech.js'] });

			expect(analyzeViaCandidatePipeline(signals, registry).results).toEqual([]);
		},
	);
});
