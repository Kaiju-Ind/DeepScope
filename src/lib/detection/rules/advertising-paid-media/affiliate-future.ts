import type { TechnologyDefinition } from '../../types';

export const affiliateFutureTechnologyDefinition = {
	id: "affiliate-future",
	name: "Affiliate Future",
	website: "https://affiliatefuture.com",
	description: "Affiliate Future is a provider of advertisers with marketing solution through its affiliate network and tools.",
	icon: "Affiliate Future.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "affiliate-future:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tags\\.affiliatefuture\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "affiliate-future:dom:1",
			kind: "dom",
			selector: "img[src*='banners.affiliatefuture.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
