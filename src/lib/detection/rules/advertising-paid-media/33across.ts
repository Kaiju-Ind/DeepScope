import type { TechnologyDefinition } from '../../types';

export const technology33acrossTechnologyDefinition = {
	id: "33across",
	name: "33Across",
	website: "https://www.33across.com",
	description: "33Across is a technology company focused on solving the challenge of consumer attention for automated advertising.",
	icon: "33Across.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "33across:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.33across\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "33across:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tynt\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "33across:requestUrl:2",
			kind: "requestUrl",
			pattern: new RegExp("\\.33across\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "33across:dom:3",
			kind: "dom",
			selector: "iframe[src*='.33across.com'], link[href*='.33across.com'], link[href*='.tynt.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "33across:jsGlobal:4",
			kind: "jsGlobal",
			property: "Tynt",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
