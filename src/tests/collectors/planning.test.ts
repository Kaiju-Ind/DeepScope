import { describe, expect, it } from 'vitest';

import { buildCollectionPlan, createIncrementalCollectionPasses, toCollectPageSignalsInput } from '@/lib/collectors/planning';
import { SOURCE_LIMITS } from '@/lib/detection/source-limits';
import type { TechnologyDefinition } from '@/lib/detection/types';

function makeTechnology(
	id: string,
	rules: TechnologyDefinition['rules'],
): TechnologyDefinition {
	return {
		id,
		name: id,
		website: `https://${id}.example`,
		categories: ['unknown'],
		rules,
	};
}

describe('collection planning', () => {
	it('deduplicates DOM selectors in registry order', () => {
		const plan = buildCollectionPlan([
			makeTechnology('alpha', [
				{ kind: 'dom', selector: 'script[src]' },
				{ kind: 'dom', selector: 'meta[name="generator"]' },
			]),
			makeTechnology('beta', [
				{ kind: 'dom', selector: 'script[src]' },
			]),
		]);

		expect(plan.selectorProbeList).toEqual([
			'script[src]',
			'meta[name="generator"]',
		]);
		expect(plan.domSelectorPlan).toMatchObject({
			selectors: ['script[src]', 'meta[name="generator"]'],
			tags: ['script', 'meta'],
			attributes: ['src', 'name'],
			candidateSelector: 'script,meta,[src],[name]',
		});
		expect(plan.domSelectorPlan.selectorsByAttribute.src).toEqual(['script[src]']);
	});

	it('serializes HTML probes with technology ids and rule indexes', () => {
		const plan = buildCollectionPlan([
			makeTechnology('wordpress', [
				{ kind: 'dom', selector: 'body' },
				{ kind: 'html', pattern: /wp-content\/themes/i },
			]),
		]);

		expect(plan.enrichment.htmlProbeList).toEqual([
			{
				technologyId: 'wordpress',
				ruleIndex: 1,
				source: 'wp-content\\/themes',
				flags: 'i',
			},
		]);
	});

	it('limits page global probes before injected script collection', () => {
		const rules = Array.from({ length: SOURCE_LIMITS.jsGlobals + 2 }, (_, index) => ({
			kind: 'jsGlobal' as const,
			property: `Global${index}`,
		}));
		const plan = buildCollectionPlan([makeTechnology('globals', rules)]);

		expect(plan.jsGlobalPropertyList).toHaveLength(SOURCE_LIMITS.jsGlobals);
		expect(plan.jsGlobalPropertyList.at(0)).toBe('Global0');
	});


	it('summarizes cheap expensive and unsupported rule surfaces', () => {
		const plan = buildCollectionPlan([
			makeTechnology('mixed', [
				{ kind: 'scriptSrc', pattern: /app.js/ },
				{ kind: 'header', key: 'server', valuePattern: /nginx/ },
				{ kind: 'scriptContent', pattern: /createApp/ },
				{ kind: 'dns', recordType: 'TXT', valuePattern: /spf/ },
			]),
		]);

		expect(plan.initial).toMatchObject({
			needsHeaders: false,
			needsScriptContent: false,
			needsStylesheetContent: false,
			needsText: false,
		});
		expect(plan.enrichment).toMatchObject({
			needsHeaders: true,
			needsScriptContent: true,
			needsStylesheetContent: false,
			needsText: false,
		});
		expect(plan.costSummary).toEqual({
			cheap: 1,
			expensive: 2,
			unsupported: 1,
		});
	});


	it('splits expensive evidence surfaces into independent continuous passes', () => {
		const plan = buildCollectionPlan([
			makeTechnology('mixed', [
				{ kind: 'dom', selector: '[data-app]' },
				{ kind: 'html', pattern: /data-app/ },
				{ kind: 'header', key: 'server', valuePattern: /nginx/ },
				{ kind: 'text', pattern: /powered by/i },
				{ kind: 'scriptContent', pattern: /hydrate/ },
			]),
		]);

		const passes = createIncrementalCollectionPasses(plan);

		expect(passes.map((pass) => pass.id)).toEqual(['initial', 'html', 'headers', 'text', 'source-content']);
		expect(passes[0]?.plan.selectorProbeList).toEqual(['[data-app]']);
		expect(passes[1]?.plan.htmlProbeList).toHaveLength(1);
		expect(passes[2]?.plan.needsHeaders).toBe(true);
		expect(passes[3]?.plan.needsText).toBe(true);
		expect(passes[4]?.plan.needsScriptContent).toBe(true);
	});

	it('keeps content-script collection input separate from injected script globals', () => {
		const plan = buildCollectionPlan([
			makeTechnology('globals', [
				{ kind: 'dom', selector: 'script[src]' },
				{ kind: 'jsGlobal', property: 'React' },
			]),
		]);

		expect(toCollectPageSignalsInput(plan)).toEqual({
			tier: 'initial',
			includeHtml: false,
			includeText: false,
			includeScriptContent: false,
			includeStylesheetContent: false,
			includeStorageKeys: false,
			selectorProbeList: ['script[src]'],
			domSelectorPlan: plan.initial.domSelectorPlan,
			htmlProbeList: [],
		});
	});
});
