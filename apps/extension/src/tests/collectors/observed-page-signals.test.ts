import { afterEach, describe, expect, it, vi } from 'vitest';

import * as observe from '@/lib/content/observe';
import { SOURCE_LIMITS } from '@/lib/detection/source-limits';
import * as dom from '@/lib/dom';

class FakeClassList extends Array<string> {
	contains(value: string): boolean {
		return this.includes(value);
	}
}

/** Small connected DOM fixture that preserves the relationships used by live matching. */
class FakeElement {
	readonly nodeType = 1;
	readonly classList = new FakeClassList();
	readonly children: FakeElement[] = [];
	readonly childNodes: FakeElement[] = this.children;
	readonly #attributes = new Map<string, string>();
	queryCount = 0;
	parentElement: FakeElement | null = null;
	previousSibling: FakeElement | null = null;
	nextSibling: FakeElement | null = null;
	ownerDocument: FakeDocument | null = null;

	constructor(readonly localName: string) {}

	get id(): string {
		return this.#attributes.get('id') ?? '';
	}

	get childElementCount(): number {
		return this.children.length;
	}

	get nextElementSibling(): FakeElement | null {
		return this.nextSibling;
	}

	setAttribute(name: string, value: string): void {
		this.#attributes.set(name, value);
		if (name === 'class') {
			this.classList.splice(0, this.classList.length, ...value.split(/\s+/u).filter(Boolean));
		}
	}

	getAttribute(name: string): string | null {
		return this.#attributes.get(name) ?? null;
	}

	getAttributeNames(): string[] {
		return [...this.#attributes.keys()];
	}

	hasAttribute(name: string): boolean {
		return this.#attributes.has(name);
	}

	append(...children: FakeElement[]): void {
		for (const child of children) {
			const previous = this.children.at(-1) ?? null;
			if (previous) previous.nextSibling = child;
			child.previousSibling = previous;
			child.nextSibling = null;
			child.parentElement = this;
			child.ownerDocument = this.ownerDocument;
			this.children.push(child);
		}
	}

	insertBefore(child: FakeElement, reference: FakeElement): void {
		const index = this.children.indexOf(reference);
		if (index < 0) throw new Error('Reference element is not a child.');
		const previous = this.children[index - 1] ?? null;
		if (previous) previous.nextSibling = child;
		child.previousSibling = previous;
		child.nextSibling = reference;
		child.parentElement = this;
		child.ownerDocument = this.ownerDocument;
		reference.previousSibling = child;
		this.children.splice(index, 0, child);
	}

	remove(child: FakeElement): void {
		const index = this.children.indexOf(child);
		if (index < 0) throw new Error('Removed element is not a child.');
		const previous = this.children[index - 1] ?? null;
		const next = this.children[index + 1] ?? null;
		if (previous) previous.nextSibling = next;
		if (next) next.previousSibling = previous;
		child.previousSibling = null;
		child.nextSibling = null;
		child.parentElement = null;
		this.children.splice(index, 1);
	}

	querySelectorAll(selector: string): FakeElement[] {
		if (selector !== '*') return [];
		this.queryCount += 1;
		const result: FakeElement[] = [];
		const visit = (element: FakeElement): void => {
			result.push(element);
			for (const child of element.children) visit(child);
		};
		for (const child of this.children) visit(child);
		return result;
	}

	matches(selector: string): boolean {
		if (selector === 'gt-root + noscript') {
			return this.localName === 'noscript' && this.previousSibling?.localName === 'gt-root';
		}
		return false;
	}
}

class FakeScriptElement extends FakeElement {
	textContent: string;

	constructor(src = '', text = '') {
		super('script');
		this.textContent = text;
		if (src) this.setAttribute('src', src);
	}

	get src(): string {
		return this.getAttribute('src') ?? '';
	}
}

class FakeImageElement extends FakeElement {
	constructor(src: string, readonly currentSrc = '') {
		super('img');
		this.setAttribute('src', src);
	}

	get src(): string {
		return this.getAttribute('src') ?? '';
	}
}

class FakeLinkElement extends FakeElement {
	readonly type = '';
	readonly as = '';
	readonly media = '';
	readonly hreflang = '';
	readonly crossOrigin = '';
	readonly relList = { contains: (value: string) => this.rel.split(/\s+/u).includes(value) };

	constructor(href: string, rel = 'stylesheet') {
		super('link');
		this.setAttribute('href', href);
		this.setAttribute('rel', rel);
	}

	get href(): string {
		return this.getAttribute('href') ?? '';
	}

	get rel(): string {
		return this.getAttribute('rel') ?? '';
	}
}

class FakeMetaElement extends FakeElement {
	constructor(name: string, content: string) {
		super('meta');
		this.setAttribute('name', name);
		this.setAttribute('content', content);
	}
}

class FakeStyleElement extends FakeElement {
	constructor(readonly textContent: string) {
		super('style');
	}
}

class FakeDocument {
	readonly nodeType = 9;
	readonly documentElement: FakeElement;
	styleSheetReadCount = 0;

	get styleSheets(): StyleSheetList {
		this.styleSheetReadCount += 1;
		return [] as unknown as StyleSheetList;
	}

	constructor(elements: readonly FakeElement[]) {
		this.documentElement = new FakeElement('html');
		this.documentElement.ownerDocument = this;
		this.documentElement.append(...elements);
		for (const element of [this.documentElement, ...this.documentElement.querySelectorAll('*')]) {
			element.ownerDocument = this;
		}
	}

	querySelectorAll(selector: string): FakeElement[] {
		return selector === '*' ? [this.documentElement, ...this.documentElement.querySelectorAll('*')] : [];
	}
}

function makeDocument(): FakeDocument {
	return new FakeDocument([
		new FakeImageElement('/images/fallback.jpg', 'https://cdn.example.com/rendered.webp'),
		new FakeScriptElement('/assets/app.js'),
		new FakeScriptElement('', 'window.__HYDRATED__ = true'),
		new FakeLinkElement('/assets/app.css'),
		new FakeStyleElement('.button { display: inline-flex; }'),
		new FakeMetaElement('generator', 'Astro'),
	]);
}

/** Install the DOM constructors that production code receives from Chromium. */
function stubDom(document: FakeDocument): void {
	vi.stubGlobal('Element', FakeElement);
	vi.stubGlobal('Document', FakeDocument);
	vi.stubGlobal('HTMLScriptElement', FakeScriptElement);
	vi.stubGlobal('HTMLImageElement', FakeImageElement);
	vi.stubGlobal('HTMLLinkElement', FakeLinkElement);
	vi.stubGlobal('HTMLMetaElement', FakeMetaElement);
	vi.stubGlobal('HTMLStyleElement', FakeStyleElement);
	vi.stubGlobal('document', document);
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

/** Create the complete PerformanceEntry shape needed by resource-observer tests. */
function makePerformanceEntry(name: string, initiatorType: string): PerformanceEntry & { readonly initiatorType: string } {
	return {
		name,
		initiatorType,
		entryType: 'resource',
		startTime: 0,
		duration: 0,
		toJSON: () => ({ name, initiatorType }),
	};
}

afterEach(() => {
	mutationObservers.length = 0;
	performanceObservers.length = 0;
	vi.useRealTimers();
	vi.unstubAllGlobals();
});

describe('observed page signals', () => {
	it('starts and stops an observation session with the configured limits', () => {
		stubDom(makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
		vi.stubGlobal('performance', {
			getEntriesByType: vi.fn(() => []),
		});

		const observedSignals = observe.create({ throttleMs: 25 });
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
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			status: 'stopped',
			stopReason: 'manual',
		});
	});


	it('stops an active session when the document URL changes', () => {
		stubDom(makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
		vi.stubGlobal('performance', {
			getEntriesByType: vi.fn(() => []),
		});

		const observedSignals = observe.create({ throttleMs: 25 });
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
		stubDom(makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
		vi.stubGlobal('performance', {
			getEntriesByType: vi.fn(() => [
				{ name: 'https://example.com/assets/app.js', initiatorType: 'script' },
			]),
		});

		const observedSignals = observe.create({ throttleMs: 25 });
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
		stubDom(makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
		vi.stubGlobal('performance', {
			getEntriesByType: vi.fn(() => []),
		});

		const observedSignals = observe.create({ throttleMs: 25 });
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
		stubDom(makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
				vi.stubGlobal('performance', { getEntriesByType: vi.fn(() => []) });

		const observedSignals = observe.create({ throttleMs: 25 });
		observedSignals.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
		});

		mutationObservers[0]?.callback([{
			type: 'childList',
			addedNodes: [new FakeScriptElement('', 'window.__LATE__ = true')] as unknown as NodeList,
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
			addedNodes: [new FakeScriptElement('', 'window.__LATE__ = true')] as unknown as NodeList,
			removedNodes: [] as unknown as NodeList,
			target: document,
		} as unknown as MutationRecord], mutationObservers[0] as unknown as MutationObserver);
		await vi.advanceTimersByTimeAsync(25);

		const withSource = await observedSignals.flushObservationBatch();
		expect(withSource.batch?.observations).toEqual(expect.arrayContaining([
			expect.objectContaining({ kind: 'scriptContent', value: 'window.__LATE__ = true' }),
		]));
	});

	it('releases session-only evidence after observation stops', async () => {
		vi.useFakeTimers();
		stubDom(makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
				vi.stubGlobal('performance', { getEntriesByType: vi.fn(() => []) });

		const observedSignals = observe.create({ throttleMs: 25 });
		observedSignals.beginObservationSession({
			sessionId: 'session-memory',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
		});

		mutationObservers[0]?.callback([{
			type: 'childList',
			addedNodes: [new FakeScriptElement('https://example.com/late-session-only.js')] as unknown as NodeList,
			removedNodes: [] as unknown as NodeList,
			target: document,
		} as unknown as MutationRecord], mutationObservers[0] as unknown as MutationObserver);
		await vi.advanceTimersByTimeAsync(25);

		const duringObservation = await observedSignals.snapshot({
			includeScriptContent: false,
			includeStylesheetContent: false,
		});
		expect(duringObservation.scripts).toContain('https://example.com/late-session-only.js');

		observedSignals.stopObservationSession('manual');
		const afterStop = await observedSignals.snapshot({
			includeScriptContent: false,
			includeStylesheetContent: false,
		});

		expect(afterStop.scripts).toEqual(['https://example.com/assets/app.js']);
		expect(afterStop.scripts).not.toContain('https://example.com/late-session-only.js');
	});

	it('bounds retained script sources while a long-lived observation is active', async () => {
		vi.useFakeTimers();
		stubDom(makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
				vi.stubGlobal('performance', { getEntriesByType: vi.fn(() => []) });

		const observedSignals = observe.create({ throttleMs: 25 });
		observedSignals.beginObservationSession({
			sessionId: 'session-bounded-sources',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: SOURCE_LIMITS.scriptSrc + 100,
			maxMutations: SOURCE_LIMITS.scriptSrc + 100,
		});

		const mutations = Array.from({ length: SOURCE_LIMITS.scriptSrc + 50 }, (_item, index) => ({
			type: 'childList',
			addedNodes: [new FakeScriptElement(`https://example.com/late-${index}.js`)] as unknown as NodeList,
			removedNodes: [] as unknown as NodeList,
			target: document,
		} as unknown as MutationRecord));
		mutationObservers[0]?.callback(mutations, mutationObservers[0] as unknown as MutationObserver);
		await vi.advanceTimersByTimeAsync(25);

		const snapshot = await observedSignals.snapshot({
			includeScriptContent: false,
			includeStylesheetContent: false,
		});

		expect(snapshot.scripts).toHaveLength(SOURCE_LIMITS.scriptSrc);
	});

	it('flushes normalized observations from the current observer snapshot', async () => {
		stubDom(makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
		vi.stubGlobal('performance', {
			getEntriesByType: vi.fn(() => [
				{ name: 'https://example.com/assets/app.js', initiatorType: 'script' },
			]),
		});

		const observedSignals = observe.create({ throttleMs: 25 });
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
		stubDom(makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
				vi.stubGlobal('performance', {
			getEntriesByType: vi.fn(() => []),
		});
		const queued = vi.fn();
		const observedSignals = observe.create({
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
				addedNodes: [new FakeScriptElement('https://example.com/late.js')] as unknown as NodeList,
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


	it('rechecks an existing right sibling when a new left sibling activates a registry selector', async () => {
		vi.useFakeTimers();
		const parent = new FakeElement('main');
		const right = new FakeElement('noscript');
		parent.append(right);
		const document = new FakeDocument([parent]);
		stubDom(document);
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
		vi.stubGlobal('performance', { getEntriesByType: vi.fn(() => []) });

		const observedSignals = observe.create({ throttleMs: 25 });
		observedSignals.beginObservationSession({
			sessionId: 'session-sibling',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
			domSelectorPlan: dom.create(['gt-root + noscript']),
		});

		const left = new FakeElement('gt-root');
		parent.insertBefore(left, right);
		mutationObservers[0]?.callback([{
			type: 'childList',
			addedNodes: [left] as unknown as NodeList,
			removedNodes: [] as unknown as NodeList,
			previousSibling: null,
			nextSibling: right,
			target: parent,
		} as unknown as MutationRecord], mutationObservers[0] as unknown as MutationObserver);
		await vi.advanceTimersByTimeAsync(25);

		const flush = await observedSignals.flushObservationBatch();
		expect(flush.batch?.observations).toEqual(expect.arrayContaining([
			expect.objectContaining({ kind: 'dom', key: 'gt-root + noscript', value: true }),
		]));
	});

	it('rechecks the surviving right sibling when removal creates a new adjacency', async () => {
		vi.useFakeTimers();
		const left = new FakeElement('gt-root');
		const middle = new FakeElement('div');
		const right = new FakeElement('noscript');
		const parent = new FakeElement('main');
		parent.append(left, middle, right);
		const document = new FakeDocument([parent]);
		stubDom(document);
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
		vi.stubGlobal('performance', { getEntriesByType: vi.fn(() => []) });

		const observedSignals = observe.create({ throttleMs: 25 });
		observedSignals.beginObservationSession({
			sessionId: 'session-removal',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
			domSelectorPlan: dom.create(['gt-root + noscript']),
		});

		parent.remove(middle);
		mutationObservers[0]?.callback([{
			type: 'childList',
			addedNodes: [] as unknown as NodeList,
			removedNodes: [middle] as unknown as NodeList,
			previousSibling: left,
			nextSibling: right,
			target: parent,
		} as unknown as MutationRecord], mutationObservers[0] as unknown as MutationObserver);
		await vi.advanceTimersByTimeAsync(25);

		const flush = await observedSignals.flushObservationBatch();
		expect(flush.batch?.observations).toEqual(expect.arrayContaining([
			expect.objectContaining({ kind: 'dom', key: 'gt-root + noscript', value: true }),
		]));
	});

	it('shares one subtree traversal across resource evidence and selector matching', async () => {
		vi.useFakeTimers();
		const root = new FakeElement('section');
		root.append(new FakeScriptElement('/late.js'), new FakeImageElement('/late.png'));
		const document = new FakeDocument([root]);
		stubDom(document);
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
		vi.stubGlobal('performance', { getEntriesByType: vi.fn(() => []) });

		const observedSignals = observe.create({ throttleMs: 25 });
		observedSignals.beginObservationSession({
			sessionId: 'session-traversal',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
			domSelectorPlan: dom.create(['script[src]']),
		});

		mutationObservers[0]?.callback([{
			type: 'childList',
			addedNodes: [root] as unknown as NodeList,
			removedNodes: [] as unknown as NodeList,
			target: document.documentElement,
		} as unknown as MutationRecord], mutationObservers[0] as unknown as MutationObserver);
		await observedSignals.flushObservationBatch();

		expect(root.queryCount).toBe(1);
	});

	it('does not reread the full CSSOM for a subtree mutation', async () => {
		vi.useFakeTimers();
		const document = makeDocument();
		stubDom(document);
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', undefined);
		vi.stubGlobal('performance', { getEntriesByType: vi.fn(() => []) });

		const style = new FakeStyleElement('.late { display: block; }');
		document.documentElement.append(style);
		const observedSignals = observe.create({ throttleMs: 25 });
		observedSignals.beginObservationSession({
			sessionId: 'session-cssom',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
			includeStylesheetContent: true,
		});

		mutationObservers[0]?.callback([{
			type: 'childList',
			addedNodes: [style] as unknown as NodeList,
			removedNodes: [] as unknown as NodeList,
			target: document.documentElement,
		} as unknown as MutationRecord], mutationObservers[0] as unknown as MutationObserver);
		const flush = await observedSignals.flushObservationBatch();

		expect(document.styleSheetReadCount).toBe(0);
		expect(flush.batch?.observations).toEqual(expect.arrayContaining([
			expect.objectContaining({ kind: 'stylesheetContent', value: '.late { display: block; }' }),
		]));
	});

	it('keeps MutationObserver callbacks free of descendant selector scans', () => {
		vi.useFakeTimers();
		stubDom(makeDocument());
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

		const observedSignals = observe.create({ throttleMs: 25 });
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
		stubDom(makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', FakePerformanceObserver);
		const getEntriesByType = vi.fn(() => [
			makePerformanceEntry('https://example.com/initial.js', 'script'),
		]);
		vi.stubGlobal('performance', { getEntriesByType });

		const queued = vi.fn();
		const observedSignals = observe.create({ throttleMs: 25, onObservationBatchQueued: queued });
		observedSignals.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
		});

		performanceObservers[0]?.emit([
			makePerformanceEntry('https://example.com/late.js', 'script'),
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

	it('rejects late resource callbacks from a superseded observation session', async () => {
		vi.useFakeTimers();
		stubDom(makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', FakePerformanceObserver);
		vi.stubGlobal('performance', { getEntriesByType: vi.fn(() => []) });

		const observedSignals = observe.create({ throttleMs: 25 });
		observedSignals.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
		});
		const staleObserver = performanceObservers[0]!;

		observedSignals.beginObservationSession({
			sessionId: 'session-2',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
		});
		const currentObserver = performanceObservers[1]!;

		staleObserver.emit([makePerformanceEntry('https://example.com/stale.js', 'script')]);
		currentObserver.emit([makePerformanceEntry('https://example.com/current.js', 'script')]);
		await vi.advanceTimersByTimeAsync(25);

		const flush = await observedSignals.flushObservationBatch();
		const resourceUrls = flush.batch?.observations
			.filter((observation) => observation.kind === 'resourceUrl')
			.map((observation) => observation.value) ?? [];
		expect(resourceUrls).toContain('https://example.com/current.js');
		expect(resourceUrls).not.toContain('https://example.com/stale.js');
	});

	it('coalesces resource-only dirty notifications to the observer throttle', async () => {
		vi.useFakeTimers();
		stubDom(makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', FakePerformanceObserver);
		vi.stubGlobal('performance', { getEntriesByType: vi.fn(() => []) });
		const queued = vi.fn();
		const observedSignals = observe.create({ throttleMs: 25, onObservationBatchQueued: queued });
		observedSignals.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
		});

		performanceObservers[0]?.emit([makePerformanceEntry('https://example.com/one.js', 'script')]);
		performanceObservers[0]?.emit([makePerformanceEntry('https://example.com/two.js', 'script')]);
		expect(queued).not.toHaveBeenCalled();

		await vi.advanceTimersByTimeAsync(25);
		expect(queued).toHaveBeenCalledOnce();
	});

	it('does not publish another dirty notification for an explicit background flush', async () => {
		vi.useFakeTimers();
		stubDom(makeDocument());
		vi.stubGlobal('location', { href: 'https://example.com/products' });
		vi.stubGlobal('MutationObserver', FakeMutationObserver);
		vi.stubGlobal('PerformanceObserver', FakePerformanceObserver);
		vi.stubGlobal('performance', { getEntriesByType: vi.fn(() => []) });
		const queued = vi.fn();
		const observedSignals = observe.create({ throttleMs: 25, onObservationBatchQueued: queued });
		observedSignals.beginObservationSession({
			sessionId: 'session-1',
			expectedUrl: 'https://example.com/products',
			durationMs: 1_000,
			maxPendingNodes: 10,
			maxMutations: 100,
		});

		performanceObservers[0]?.emit([makePerformanceEntry('https://example.com/late.js', 'script')]);
		const flush = await observedSignals.flushObservationBatch();
		expect(flush.batch?.observations.length).toBeGreaterThan(0);

		await vi.advanceTimersByTimeAsync(25);
		expect(queued).not.toHaveBeenCalled();
	});

});
