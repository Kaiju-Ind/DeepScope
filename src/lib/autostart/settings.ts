import { browser } from 'wxt/browser';

/** Storage key for the user-controlled page-load scanning preference. */
export const AUTO_SCAN_ENABLED_STORAGE_KEY = 'kaiju-deepscope.settings.auto-scan-enabled.v1';

/** Automatic scanning is the default product behavior unless the user disables it. */
export const DEFAULT_AUTO_SCAN_ENABLED = true;

/** Read whether new active pages should be analyzed automatically. */
export async function getAutoScanEnabled(): Promise<boolean> {
	const stored = await browser.storage.local.get(AUTO_SCAN_ENABLED_STORAGE_KEY);
	const value = stored[AUTO_SCAN_ENABLED_STORAGE_KEY];
	return typeof value === 'boolean' ? value : DEFAULT_AUTO_SCAN_ENABLED;
}

/** Persist the automatic page-load scanning preference. */
export async function setAutoScanEnabled(enabled: boolean): Promise<void> {
	await browser.storage.local.set({
		[AUTO_SCAN_ENABLED_STORAGE_KEY]: enabled,
	});
}
