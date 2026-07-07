import type { TechnologyDefinition } from '../../types';

export const dreamdataTechnologyDefinition = {
	id: "dreamdata",
	name: "Dreamdata",
	website: "https://dreamdata.io",
	description: "Dreamdata is a B2B revenue attribution platform.",
	icon: "Dreamdata.svg",
	categories: [
		"marketing-automation",
		"analytics",
	],
	rules: [
		{
			id: "dreamdata:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.bizible\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dreamdata:dom:1",
			kind: "dom",
			selector: "link[href*='.bizible.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "dreamdata:jsGlobal:2",
			kind: "jsGlobal",
			property: "BizTrackingA",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dreamdata:jsGlobal:3",
			kind: "jsGlobal",
			property: "Bizible",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
