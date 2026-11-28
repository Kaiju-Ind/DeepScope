import { defineProxy } from 'comctx';
import { browser } from 'wxt/browser';

import { CONTENT_RPC_NAMESPACE, createContentClientAdapter, type ContentApi } from "../messaging/index.ts";

/** Build a content-script RPC client for one tab/frame at the browser interface. */
export function createContentApiClient(tabId: number, frameId = 0): ContentApi {
	const [, injectContentApi] = defineProxy(() => ({}) as ContentApi, {
		namespace: CONTENT_RPC_NAMESPACE,
		heartbeatCheck: false,
		transfer: false,
	});

	return injectContentApi(createContentClientAdapter(tabId, frameId));
}

/** Inject the generated content-script bundle into the top frame. */
export async function executeContentScript(tabId: number): Promise<void> {
	await browser.scripting.executeScript({
		target: { tabId, frameIds: [0] },
		files: ['/content-scripts/content.js'],
	});
}
