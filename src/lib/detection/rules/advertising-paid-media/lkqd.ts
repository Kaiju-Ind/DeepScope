import type { TechnologyDefinition } from '../../types';

export const lkqdTechnologyDefinition = {
	id: "lkqd",
	name: "LKQD",
	website: "https://wiki.lkqd.com",
	description: "LKQD is a video advertising platform that enables publishers to serve video ads across multiple devices and formats.",
	icon: "LKQD.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "lkqd:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.lkqd\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lkqd:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("\\.lkqd\\.net"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "lkqd:dom:2",
			kind: "dom",
			selector: "iframe[src*='.lkqd.net']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "lkqd:jsGlobal:3",
			kind: "jsGlobal",
			property: "lkqdCall",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lkqd:jsGlobal:4",
			kind: "jsGlobal",
			property: "lkqdErrorCount",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lkqd:jsGlobal:5",
			kind: "jsGlobal",
			property: "lkqdSettings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lkqd:jsGlobal:6",
			kind: "jsGlobal",
			property: "lkqd_http_response",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
