import { afterEach, describe, expect, it, vi } from 'vitest';

import { createObservedPageSignals } from '@/lib/content/observed-page-signals';

function makeScript(input: { src?: string; text?: string }): HTMLScriptElement {
	return {
		src: input.src ?? '',
		textContent: input.text ?? '',
		getAttribute(name: string) {
			return name === 'src' ? input.src ?? null : null;
		},
	} as HTMLScriptElement;
}

function makeImage(src: string, currentSrc = ''): HTMLImageElement {
	return {
		src,
		currentSrc,
		getAttribute(name: string) {
			return name === 'src' ? src : null;
		},
	} as HTMLImageElement;
}

function makeStylesheetLink(href: string): HTMLLinkElement {
	return {
		href,
		rel: 'stylesheet',
		type: '',
		as: '',
		media: '',
		hreflang: '',
		crossOrigin: '',
		relList: {
			contains(value: string) {
				return value === 'stylesheet';
			},
		},
		getAttribute(name: string) {
			if (name === 'href') return href;
			if (name === 'rel') return 'stylesheet';
			return null;
		},
	} as unknown as HTMLLinkElement;
}

function makeMeta(name: string, content: string): HTMLMetaElement {
	return {
		getAttribute(attribute: string) {
			if (attribute === 'name') return name;
			if (attribute === 'content') return content;
			return null;
		},
	} as HTMLMetaElement;
}

function makeStyle(text: string): HTMLStyleElement {
	return {
		textContent: text,
	} as HTMLStyleElement;
}

function makeDocument(): Document {
	const images = [makeImage('/images/fallback.jpg', 'https://cdn.example.com/rendered.webp')];
	const scripts = [
		makeScript({ src: '/assets/app.js' }),
		makeScript({ text: 'window.__HYDRATED__ = true' }),
	];
	const links = [makeStylesheetLink('/assets/app.css')];
	const styles = [makeStyle('.button { display: inline-flex; }')];
	const metas = [makeMeta('generator', 'Astro')];

	return {
		styleSheets: [],
		querySelectorAll(selector: string) {
			if (selector === 'img[src], img[srcset]') return images;
			if (selector === 'script') return scripts;
			if (selector === 'link[rel~="stylesheet"]') return links;
			if (selector === 'link[href]') return links;
			if (selector === 'style') return styles;
			if (selector === 'meta') return metas;
			return [];
		},
	} as unknown as Document;
}

const mutationObservers: FakeMutationObserver[] = [];
const performanceObservers: FakePerformanceObserver[] = [];

class FakeMutationObserver {
	observe = vi.fn();
	disconnect = vi.fn();

	constructor(readonly callback: MutationCallback) {
		mutationObservers.push(this);
	}
}


class FakePerformanceObserver {
	observe = vi.fn();
	disconnect = vi.fn();

	constructor(readonly callback: PerformanceObserverCallback) {
		performanceObservers.push(this);
	}

	emit(entries: PerformanceEntry[]): void {
		const list = { getEntries: () => entries } as PerformanceObserverEntryList;
		this.callback(list, this as unknown as PerformanceObserver);
	}
}

class FakeObservedScriptElement {
	readonly textContent: string;

	constructor(readonly src: string, text = '') {
		this.textContent = text;
	}

	getAttribute(name: string): string | null {
		return name === 'src' ? this.src : null;
	}
}

afterEach(() => {
	mutationObservers.length = 0;
	performanceObservers.length = 0;
	vi.useRealTimers();
	vi.unstubAllGlobals();
});

describe('observed page signals', () => {
	it('starts and stops an observation session with the configured limits', () => {
		vi.stubGlobal('document', makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
		vi.stubGlobal('performance', {
			getEntriesByType: vi.fn(() => []),
		});

		const observedSignals = createObservedPageSignals({ throttleMs: 25 });
		const active = observedSignals.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
		});
		const stopped = observedSignals.stopObservationSession('manual');

		expect(active).toMatchObject({
			sessionId: 'session-1',
			status: 'observing',
			throttleMs: 25,
		});
		expect(stopped).toMatchObject({
			status: 'stopped',
			stopReason: 'manual',
		});
	});


	it('stops an active session when the document URL changes', () => {
		vi.stubGlobal('document', makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
		vi.stubGlobal('performance', {
			getEntriesByType: vi.fn(() => []),
		});

		const observedSignals = createObservedPageSignals({ throttleMs: 25 });
		observedSignals.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
		});
		vi.stubGlobal('location', { href: 'https://example.com/pricing' });

		expect(observedSignals.status()).toMatchObject({
			status: 'stopped',
			stopReason: 'navigation',
		});
	});

	it('returns a current document snapshot in the same shape used by collectPageSignals', async () => {
		vi.stubGlobal('document', makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
		vi.stubGlobal('performance', {
			getEntriesByType: vi.fn(() => [
				{ name: 'https://example.com/assets/app.js', initiatorType: 'script' },
			]),
		});

		const observedSignals = createObservedPageSignals({ throttleMs: 25 });
		observedSignals.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
		});

		await expect(observedSignals.snapshot()).resolves.toMatchObject({
			images: ['https://cdn.example.com/rendered.webp'],
			scripts: ['https://example.com/assets/app.js'],
			stylesheets: ['https://example.com/assets/app.css'],
			resources: [
				{
					url: 'https://example.com/assets/app.js',
					initiatorType: 'script',
				},
			],
			requests: [
				{
					url: 'https://example.com/assets/app.js',
					type: 'script',
				},
			],
			scriptContents: ['window.__HYDRATED__ = true'],
			stylesheetContents: ['.button { display: inline-flex; }'],
			meta: { generator: ['Astro'] },
		});
	});

	it('skips expensive source text when a snapshot tier does not request it', async () => {
		vi.stubGlobal('document', makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
		vi.stubGlobal('performance', {
			getEntriesByType: vi.fn(() => []),
		});

		const observedSignals = createObservedPageSignals({ throttleMs: 25 });
		const snapshot = await observedSignals.snapshot({
			includeScriptContent: false,
			includeStylesheetContent: false,
		});

		expect(snapshot.scripts).toEqual(['https://example.com/assets/app.js']);
		expect(snapshot.stylesheets).toEqual(['https://example.com/assets/app.css']);
		expect(snapshot.scriptContents).toEqual([]);
		expect(snapshot.stylesheetContents).toEqual([]);
	});

	it('collects late inline source only when the observation session requests it', async () => {
		vi.useFakeTimers();
		vi.stubGlobal('document', makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
		vi.stubGlobal('HTMLScriptElement', FakeObservedScriptElement);
		vi.stubGlobal('performance', { getEntriesByType: vi.fn(() => []) });

		const observedSignals = createObservedPageSignals({ throttleMs: 25 });
		observedSignals.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
		});

		mutationObservers[0]?.callback([{
			type: 'childList',
			addedNodes: [new FakeObservedScriptElement('', 'window.__LATE__ = true')] as unknown as NodeList,
			removedNodes: [] as unknown as NodeList,
			target: document,
		} as unknown as MutationRecord], mutationObservers[0] as unknown as MutationObserver);
		await vi.advanceTimersByTimeAsync(25);

		const withoutSource = await observedSignals.flushObservationBatch();
		expect(withoutSource.batch?.observations.some((observation) => observation.kind === 'scriptContent') ?? false).toBe(false);

		observedSignals.stopObservationSession('manual');
		observedSignals.beginObservationSession({
			sessionId: 'session-2',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
			includeScriptContent: true,
		});

		mutationObservers[0]?.callback([{
			type: 'childList',
			addedNodes: [new FakeObservedScriptElement('', 'window.__LATE__ = true')] as unknown as NodeList,
			removedNodes: [] as unknown as NodeList,
			target: document,
		} as unknown as MutationRecord], mutationObservers[0] as unknown as MutationObserver);
		await vi.advanceTimersByTimeAsync(25);

		const withSource = await observedSignals.flushObservationBatch();
		expect(withSource.batch?.observations).toEqual(expect.arrayContaining([
			expect.objectContaining({ kind: 'scriptContent', value: 'window.__LATE__ = true' }),
		]));
	});

	it('flushes normalized observations from the current observer snapshot', async () => {
		vi.stubGlobal('document', makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
		vi.stubGlobal('performance', {
			getEntriesByType: vi.fn(() => [
				{ name: 'https://example.com/assets/app.js', initiatorType: 'script' },
			]),
		});

		const observedSignals = createObservedPageSignals({ throttleMs: 25 });
		observedSignals.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
		});
		await observedSignals.snapshot();

		const flushed = await observedSignals.flushObservationBatch();

		expect(flushed.session).toMatchObject({ status: 'observing' });
		expect(flushed.batch?.target).toEqual({ url: 'https://example.com/products', hostname: 'example.com' });
		expect(flushed.batch?.observations.map((observation) => observation.kind)).toEqual(
			expect.arrayContaining(['imageSrc', 'scriptSrc', 'stylesheetHref', 'resourceUrl', 'requestUrl', 'scriptContent', 'stylesheetContent', 'meta']),
		);
	});

	/**
	 * The observer stream should publish a lifecycle event as soon as the
	 * throttled scan has queued new facts. The background still owns detector
	 * reruns, but the side panel no longer needs to wait for the next background poll
	 * before it knows that live page evidence advanced.
	 */
	it('notifies when throttled mutation scans queue late observations', async () => {
		vi.useFakeTimers();
		vi.stubGlobal('document', makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
		vi.stubGlobal('HTMLScriptElement', FakeObservedScriptElement);
		vi.stubGlobal('performance', {
			getEntriesByType: vi.fn(() => []),
		});
		const queued = vi.fn();
		const observedSignals = createObservedPageSignals({
			throttleMs: 25,
			onObservationBatchQueued: queued,
		});
		observedSignals.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
		});

		mutationObservers[0]?.callback([
			{
				type: 'childList',
				addedNodes: [new FakeObservedScriptElement('https://example.com/late.js')] as unknown as NodeList,
				removedNodes: [] as unknown as NodeList,
				target: document,
			} as unknown as MutationRecord,
		], mutationObservers[0] as unknown as MutationObserver);

		expect(queued).not.toHaveBeenCalled();
		await vi.advanceTimersByTimeAsync(25);

		expect(queued).toHaveBeenCalledOnce();
		expect(queued).toHaveBeenCalledWith(expect.objectContaining({
			stats: expect.objectContaining({ acceptedCount: expect.any(Number) }),
			session: expect.objectContaining({ status: 'observing', sessionId: 'session-1' }),
		}));
		expect(queued.mock.calls[0]?.[0].stats.acceptedCount).toBeGreaterThan(0);
	});

	it('keeps MutationObserver callbacks free of descendant selector scans', () => {
		vi.useFakeTimers();
		vi.stubGlobal('document', makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
		vi.stubGlobal('performance', { getEntriesByType: vi.fn(() => []) });

		const querySelector = vi.fn(() => null);
		class FakeContainerElement {
			readonly childElementCount = 1;
			readonly localName = 'div';
			readonly id = '';
			readonly classList: readonly string[] = [];
			readonly querySelector = querySelector;

			getAttributeNames(): string[] {
				return [];
			}
		}
		vi.stubGlobal('Element', FakeContainerElement);

		const observedSignals = createObservedPageSignals({ throttleMs: 25 });
		observedSignals.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
		});

		mutationObservers[0]?.callback([{
			type: 'childList',
			addedNodes: [new FakeContainerElement()] as unknown as NodeList,
			removedNodes: [] as unknown as NodeList,
			target: document,
		} as unknown as MutationRecord], mutationObservers[0] as unknown as MutationObserver);

		expect(querySelector).not.toHaveBeenCalled();
		observedSignals.stopObservationSession('manual');
	});

	it('uses PerformanceObserver entries without rescanning the full resource timeline', async () => {
		vi.useFakeTimers();
		vi.stubGlobal('document', makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', FakePerformanceObserver);
		const getEntriesByType = vi.fn(() => [
			{ name: 'https://example.com/initial.js', initiatorType: 'script' } as PerformanceEntry,
		]);
		vi.stubGlobal('performance', { getEntriesByType });

		const queued = vi.fn();
		const observedSignals = createObservedPageSignals({ throttleMs: 25, onObservationBatchQueued: queued });
		observedSignals.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
		});

		performanceObservers[0]?.emit([
			{ name: 'https://example.com/late.js', initiatorType: 'script' } as PerformanceEntry,
		]);
		await vi.advanceTimersByTimeAsync(25);

		expect(getEntriesByType).toHaveBeenCalledTimes(1);
		expect(queued).toHaveBeenCalledOnce();
		const flush = await observedSignals.flushObservationBatch();
		expect(flush.batch?.observations).toEqual(expect.arrayContaining([
			expect.objectContaining({ kind: 'resourceUrl', value: 'https://example.com/initial.js' }),
			expect.objectContaining({ kind: 'resourceUrl', value: 'https://example.com/late.js' }),
		]));
	});

	it('coalesces resource-only dirty notifications to the observer throttle', async () => {
		vi.useFakeTimers();
		vi.stubGlobal('document', makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', FakePerformanceObserver);
		vi.stubGlobal('performance', { getEntriesByType: vi.fn(() => []) });
		const queued = vi.fn();
		const observedSignals = createObservedPageSignals({ throttleMs: 25, onObservationBatchQueued: queued });
		observedSignals.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
		});

		performanceObservers[0]?.emit([{ name: 'https://example.com/one.js', initiatorType: 'script' } as PerformanceEntry]);
		performanceObservers[0]?.emit([{ name: 'https://example.com/two.js', initiatorType: 'script' } as PerformanceEntry]);
		expect(queued).not.toHaveBeenCalled();

		await vi.advanceTimersByTimeAsync(25);
		expect(queued).toHaveBeenCalledOnce();
	});

	it('does not publish another dirty notification for an explicit background flush', async () => {
		vi.useFakeTimers();
		vi.stubGlobal('document', makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', FakePerformanceObserver);
		vi.stubGlobal('performance', { getEntriesByType: vi.fn(() => []) });
		const queued = vi.fn();
		const observedSignals = createObservedPageSignals({ throttleMs: 25, onObservationBatchQueued: queued });
		observedSignals.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
		});

		performanceObservers[0]?.emit([{ name: 'https://example.com/late.js', initiatorType: 'script' } as PerformanceEntry]);
		const flush = await observedSignals.flushObservationBatch();
		expect(flush.batch?.observations.length).toBeGreaterThan(0);

		await vi.advanceTimersByTimeAsync(25);
		expect(queued).not.toHaveBeenCalled();
	});

});
