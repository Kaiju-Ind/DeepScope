import type { TechnologyDefinition } from '../../types';

export const ometriaTechnologyDefinition = {
	id: "ometria",
	name: "Ometria",
	website: "https://ometria.com",
	description: "Ometria is a customer insight and marketing automation platform.",
	icon: "Ometria.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "ometria:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.ometria\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ometria:dom:1",
			kind: "dom",
			selector: "form[action*='api.ometria.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "ometria:jsGlobal:2",
			kind: "jsGlobal",
			property: "AddOmetriaBasket",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ometria:jsGlobal:3",
			kind: "jsGlobal",
			property: "AddOmetriaIdentify",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ometria:jsGlobal:4",
			kind: "jsGlobal",
			property: "ometria",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ometria:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^ometria$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
