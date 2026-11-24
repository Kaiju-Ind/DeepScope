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

		expect(plan.initial.domSelectorPlan.selectors).toEqual([
			'script[src]',
			'meta[name="generator"]',
		]);
		expect(plan.initial.domSelectorPlan).toMatchObject({
			selectors: ['script[src]', 'meta[name="generator"]'],
			selectorsWithoutRoute: [],
		});
		expect(plan.initial.domSelectorPlan.selectorsByAttribute.src).toEqual(['script[src]']);
		expect(plan.initial.domSelectorPlan.probes).toEqual([
			expect.objectContaining({ selector: 'script[src]', tags: ['script'], attributes: ['src'], valid: true }),
			expect.objectContaining({ selector: 'meta[name="generator"]', tags: ['meta'], attributes: ['name'], valid: true }),
		]);
	});

	it('routes selectors by the element that owns the final match', () => {
		const plan = buildCollectionPlan([
			makeTechnology('selectors', [
				{ kind: 'dom', selector: '.ancestor [data-child]' },
				{ kind: 'dom', selector: 'html > :not(body)' },
				{ kind: 'dom', selector: 'div:not(.disabled)' },
			]),
		]);
		const dom = plan.initial.domSelectorPlan;

		expect(dom.selectorsByClass.ancestor).toBeUndefined();
		expect(dom.selectorsByAttribute['data-child']).toEqual(['.ancestor [data-child]']);
		expect(dom.selectorsByTag.div).toEqual(['div:not(.disabled)']);
		expect(dom.selectorsWithoutRoute).toEqual(['html > :not(body)']);
		expect(dom.attributeFilter).toContain('data-child');
	});

	it('routes adjacent-sibling invalidation from the left compound', () => {
		const plan = buildCollectionPlan([
			makeTechnology('siblings', [
				{ kind: 'dom', selector: 'gt-root + noscript' },
				{ kind: 'dom', selector: "a[href*='xyzscripts.com/'] + a[href*='www.xyzscripts.com']" },
			]),
		]);

		expect(plan.initial.domSelectorPlan.mutation.siblings).toEqual([
			expect.objectContaining({
				kind: 'adjacent',
				deep: false,
				left: expect.objectContaining({ tags: ['gt-root'] }),
			}),
			expect.objectContaining({
				kind: 'adjacent',
				deep: false,
				left: expect.objectContaining({ tags: ['a'], attributes: ['href'] }),
			}),
		]);
		expect(plan.initial.domSelectorPlan.mutation.siblingAttributes).toContain('href');
	});


	it('falls back to a time-sliced document scan for nested structural invalidation', () => {
		const plan = buildCollectionPlan([
			makeTechnology('complex-structure', [
				{ kind: 'dom', selector: 'section:has(.ready) + aside' },
			]),
		]);
		const mutation = plan.initial.domSelectorPlan.mutation;

		expect(mutation.documentOnChildList).toBe(true);
		expect(mutation.documentAttributes).toContain('class');
	});

	it('marks malformed selectors invalid instead of routing them through document-wide matching', () => {
		const plan = buildCollectionPlan([
			makeTechnology('invalid-selector', [
				{ kind: 'dom', selector: 'div:not(' },
			]),
		]);
		const dom = plan.initial.domSelectorPlan;

		expect(dom.probes).toEqual([expect.objectContaining({ selector: 'div:not(', valid: false })]);
		expect(dom.selectorsWithoutRoute).toEqual([]);
		expect(dom.selectorsByTag.div).toBeUndefined();
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

		expect(plan.initial.jsGlobalPropertyList).toHaveLength(SOURCE_LIMITS.jsGlobals);
		expect(plan.initial.jsGlobalPropertyList.at(0)).toBe('Global0');
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
		expect(passes[0]?.plan.domSelectorPlan.selectors).toEqual(['[data-app]']);
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
			domSelectorPlan: plan.initial.domSelectorPlan,
			htmlProbeList: [],
		});
	});
});
