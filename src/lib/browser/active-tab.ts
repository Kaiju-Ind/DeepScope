import { browser, type Browser } from 'wxt/browser';

type BrowserTab = Browser.tabs.Tab;

let lastInspectableTab: BrowserTab | undefined;

/** Remember the last website tab found before popup or DevTools focus changes. */
function rememberInspectableTab(tab: BrowserTab | undefined): BrowserTab | undefined {
	if (tab && canInspectTab(tab)) {
		lastInspectableTab = tab;
	}

	return tab;
}

/**
 * Return the inspectable tab that should own a popup command.
 *
 * Chrome can report no `lastFocusedWindow` tab when extension UI or DevTools has
 * focus. The detector still needs the user's active website tab in that case, so
 * the lookup tries the focused window first, then falls back to visible tabs from
 * normal browser windows. Unsupported extension and browser pages are filtered at
 * each step so a focused popup never becomes the analysis target.
 */
export async function getActiveTab() {
	const focusedTab = await getFocusedWindowActiveTab();
	if (focusedTab && canInspectTab(focusedTab)) {
		return rememberInspectableTab(focusedTab);
	}

	const currentWindowTab = await getCurrentWindowActiveTab();
	if (currentWindowTab && canInspectTab(currentWindowTab)) {
		return rememberInspectableTab(currentWindowTab);
	}

	const mostRecentTab = await getMostRecentInspectableActiveTab();
	if (mostRecentTab) {
		return rememberInspectableTab(mostRecentTab);
	}

	return getLastInspectableTab();
}

/** Keep unsupported browser/internal URLs out of the content-script pipeline. */
export function canInspectTab(tab: { url?: string }): boolean {
	if (!tab.url) {
		return false;
	}

	try {
		const { protocol } = new URL(tab.url);
		return protocol === 'http:' || protocol === 'https:';
	} catch {
		return false;
	}
}

async function getFocusedWindowActiveTab(): Promise<BrowserTab | undefined> {
	const [tab] = await browser.tabs.query({
		active: true,
		lastFocusedWindow: true,
	});

	return tab;
}

async function getCurrentWindowActiveTab(): Promise<BrowserTab | undefined> {
	try {
		const [tab] = await browser.tabs.query({
			active: true,
			currentWindow: true,
		});

		return tab;
	} catch {
		return undefined;
	}
}

async function getMostRecentInspectableActiveTab(): Promise<BrowserTab | undefined> {
	const windows = await browser.windows.getAll({
		populate: true,
		windowTypes: ['normal'],
	});

	return windows
		.slice()
		.sort((left, right) => (right.focused === true ? 1 : 0) - (left.focused === true ? 1 : 0))
		.flatMap((window) => window.tabs ?? [])
		.find((tab) => tab.active === true && canInspectTab(tab));
}


/** Return the remembered website tab when popup or DevTools focus hides all visible tab queries. */
async function getLastInspectableTab(): Promise<BrowserTab | undefined> {
	if (!lastInspectableTab?.id) {
		return undefined;
	}

	try {
		const tab = await browser.tabs.get(lastInspectableTab.id);
		return canInspectTab(tab) ? rememberInspectableTab(tab) : undefined;
	} catch {
		lastInspectableTab = undefined;
		return undefined;
	}
}
