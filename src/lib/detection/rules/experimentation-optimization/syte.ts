import type { TechnologyDefinition } from '../../types';

export const syteTechnologyDefinition = {
	id: "syte",
	name: "Syte",
	website: "https://www.syte.ai",
	description: "Syte is a provider of visual AI technology that aims to improve retailers' site navigation, product discovery, and user experience by powering solutions that engage and convert shoppers.",
	icon: "Syte.svg",
	categories: [
		"experimentation-optimization",
		"search",
	],
	rules: [
		{
			id: "syte:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.syteapi\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "syte:dom:1",
			kind: "dom",
			selector: "img[src*='cdn.syteapi.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "syte:jsGlobal:2",
			kind: "jsGlobal",
			property: "SyteApi.getBinImageBB",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "syte:jsGlobal:3",
			kind: "jsGlobal",
			property: "SyteApp.Analytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "syte:jsGlobal:4",
			kind: "jsGlobal",
			property: "SytePixel",
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
