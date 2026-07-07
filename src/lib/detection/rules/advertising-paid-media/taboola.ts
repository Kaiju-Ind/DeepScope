import type { TechnologyDefinition } from '../../types';

export const taboolaTechnologyDefinition = {
	id: "taboola",
	name: "Taboola",
	website: "https://www.taboola.com",
	description: "Taboola is a content discovery & native advertising platform for publishers and advertisers.",
	icon: "Taboola.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "taboola:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.taboola\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "taboola:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("\\.taboola\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "taboola:dom:2",
			kind: "dom",
			selector: "link[href*='.taboola.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "taboola:jsGlobal:3",
			kind: "jsGlobal",
			property: "_taboola",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "taboola:jsGlobal:4",
			kind: "jsGlobal",
			property: "_taboolaNetworkMode",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "taboola:jsGlobal:5",
			kind: "jsGlobal",
			property: "taboola_view_id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "taboola:jsGlobal:6",
			kind: "jsGlobal",
			property: "TRCImpl.global",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "taboola:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^taboola_session_id$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
