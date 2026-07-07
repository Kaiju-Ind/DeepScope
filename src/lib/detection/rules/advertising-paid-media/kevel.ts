import type { TechnologyDefinition } from '../../types';

export const kevelTechnologyDefinition = {
	id: "kevel",
	name: "Kevel",
	website: "https://www.kevel.com",
	description: "Kevel (formerly Adzerk) is a developer of ad-serving APIs to help developers build server-side ad platforms.",
	icon: "Kevel.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "kevel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("adzerk\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kevel:dom:1",
			kind: "dom",
			selector: "iframe[src*='adzerk.net'], link[href*='adzerk.net']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kevel:jsGlobal:2",
			kind: "jsGlobal",
			property: "ados",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kevel:jsGlobal:3",
			kind: "jsGlobal",
			property: "adosResults",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
