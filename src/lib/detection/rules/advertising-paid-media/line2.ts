import type { TechnologyDefinition } from '../../types';

export const line2TechnologyDefinition = {
	id: "line2",
	name: "Line2",
	website: "https://www.line2.com",
	description: "Line2 is an affiliate network that enables travel-related publishers and partners to monetize web traffic through targeted travel offers and commissions.",
	icon: "Line2.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "line2:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/Line2Text\\.Me\\/s\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "line2:jsGlobal:1",
			kind: "jsGlobal",
			property: "Line2_W_OBJ",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "line2:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/line2text\\.me\\/s\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
