import type { TechnologyDefinition } from '../../types';

export const smartlookTechnologyDefinition = {
	id: "smartlook",
	name: "Smartlook",
	website: "https://www.smartlook.com",
	description: "Smartlook is a qualitative analytics solution for websites and mobile apps.",
	icon: "Smartlook.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "smartlook:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.smartlook\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "smartlook:jsGlobal:1",
			kind: "jsGlobal",
			property: "smartlook",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "smartlook:jsGlobal:2",
			kind: "jsGlobal",
			property: "smartlook_key",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
