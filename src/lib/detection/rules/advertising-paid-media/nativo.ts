import type { TechnologyDefinition } from '../../types';

export const nativoTechnologyDefinition = {
	id: "nativo",
	name: "Nativo",
	website: "https://www.nativo.com",
	description: "Nativo is an advertising technology provider.",
	icon: "Nativo.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "nativo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ntv\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nativo:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.postrelease\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nativo:dom:2",
			kind: "dom",
			selector: "link[href*='.postrelease.com/'], img[src*='.postrelease.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "nativo:jsGlobal:3",
			kind: "jsGlobal",
			property: "ntvConfig",
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
