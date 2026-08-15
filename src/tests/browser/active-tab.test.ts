import { afterEach, describe, expect, it, vi } from 'vitest';

type TestTab = {
	readonly id: number;
	readonly windowId: number;
	readonly active: boolean;
	readonly url?: string;
};

type ActiveTabHarness = {
	readonly getActiveTab: () => Promise<TestTab | undefined>;
	readonly query: ReturnType<typeof vi.fn>;
	readonly get: ReturnType<typeof vi.fn>;
};

afterEach(() => {
	vi.doUnmock('wxt/browser');
	vi.resetModules();
});

describe('active-tab browser adapter', () => {
	it('does not reuse a remembered tab after it becomes inactive', async () => {
		const firstTab = createTab(1, 'https://first.example/');
		const harness = await createHarness({
			queryResults: [[firstTab], [], []],
			getResult: { ...firstTab, active: false },
		});

		expect(await harness.getActiveTab()).toEqual(firstTab);
		expect(await harness.getActiveTab()).toBeUndefined();
		expect(harness.get).toHaveBeenCalledWith(firstTab.id);
	});

	it('keeps the remembered fallback when the same website tab is still active', async () => {
		const firstTab = createTab(1, 'https://first.example/');
		const harness = await createHarness({
			queryResults: [[firstTab], [], []],
			getResult: firstTab,
		});

		expect(await harness.getActiveTab()).toEqual(firstTab);
		expect(await harness.getActiveTab()).toEqual(firstTab);
	});

	it('replaces the remembered tab when a different active website tab is visible', async () => {
		const firstTab = createTab(1, 'https://first.example/');
		const secondTab = createTab(2, 'https://second.example/');
		const harness = await createHarness({
			queryResults: [[firstTab], [secondTab]],
			getResult: firstTab,
		});

		expect(await harness.getActiveTab()).toEqual(firstTab);
		expect(await harness.getActiveTab()).toEqual(secondTab);
		expect(harness.get).not.toHaveBeenCalled();
	});
});

function createTab(id: number, url: string): TestTab {
	return { id, windowId: 10, active: true, url };
}

async function createHarness(input: {
	readonly queryResults: readonly (readonly TestTab[])[];
	readonly getResult: TestTab;
}): Promise<ActiveTabHarness> {
	vi.resetModules();
	const queryResults = [...input.queryResults];
	const query = vi.fn(async () => queryResults.shift() ?? []);
	const get = vi.fn(async () => input.getResult);
	const getAll = vi.fn(async () => []);

	vi.doMock('wxt/browser', () => ({
		browser: {
			tabs: { query, get },
			windows: { getAll },
		},
	}));

	const { getActiveTab } = await import('@/lib/browser/active-tab');
	return {
		getActiveTab: getActiveTab as () => Promise<TestTab | undefined>,
		query,
		get,
	};
}
