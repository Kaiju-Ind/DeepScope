import { browser } from 'wxt/browser';

import { badgeText, type BadgeState } from "./badge.ts";

/** Show a compact count and useful finding in the browser action without opening the panel. */
export async function applyBadge(tabId: number, { count, finding }: BadgeState): Promise<void> {
	const text = badgeText(count);
	const title = count <= 0
		? 'Kaiju DeepScope'
		: `Kaiju DeepScope · ${count} ${count === 1 ? 'technology' : 'technologies'}${finding ? ` · Top finding: ${finding}` : ''}`;
	const textColor = browser.action.setBadgeTextColor?.({ tabId, color: '#030812' });
	await Promise.all([
		browser.action.setBadgeText({ tabId, text }),
		browser.action.setBadgeBackgroundColor({ tabId, color: '#54def0' }),
		browser.action.setTitle({ tabId, title }),
		...(textColor ? [textColor] : []),
	]);
}
