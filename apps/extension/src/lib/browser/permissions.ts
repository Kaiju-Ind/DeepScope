import { browser } from 'wxt/browser';

import { errorResponse, type ExtensionFailure } from '@/lib/messaging/result';

/** The website access DeepScope's manifest asks for. */
const WEBSITE_ORIGINS = ['http://*/*', 'https://*/*'];

/** Reserved for future optional deeper-detection features such as headers. */
export async function hasHostPermission(url: string): Promise<boolean> {
	return browser.permissions.contains({ origins: [new URL(url).origin + '/*'] });
}

/**
 * Explain a tab whose URL the browser withholds.
 *
 * Firefox hides `tab.url` from an extension whose website access the user has
 * turned off, which used to read as "no inspectable URL yet". When DeepScope
 * lacks website access the answer is PERMISSION_DENIED with the way to turn it
 * back on; otherwise the page is still loading. A failed check keeps the
 * loading answer rather than blaming permissions without evidence.
 */
export async function missingUrlFailure(): Promise<ExtensionFailure> {
	const granted = await Promise.resolve()
		.then(() => browser.permissions.contains({ origins: WEBSITE_ORIGINS }))
		.catch(() => true);
	if (!granted) {
		return errorResponse(
			'PERMISSION_DENIED',
			'DeepScope cannot see this page because its access to websites is turned off. Allow it to access websites in the browser\'s extension settings (in Firefox: Add-ons and themes, DeepScope, Permissions), then reload the page.',
		);
	}
	return errorResponse('NO_ACTIVE_TAB', 'The browser tab does not have an inspectable URL yet.');
}
