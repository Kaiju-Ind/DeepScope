import { browser } from 'wxt/browser';

/** Reserved for future optional deeper-detection features such as headers. */
export async function hasHostPermission(url: string): Promise<boolean> {
	return browser.permissions.contains({ origins: [new URL(url).origin + '/*'] });
}
