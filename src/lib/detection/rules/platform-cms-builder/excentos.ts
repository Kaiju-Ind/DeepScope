import type { TechnologyDefinition } from '../../types';

export const excentosTechnologyDefinition = {
	id: "excentos",
	name: "Excentos",
	website: "https://www.excentos.com",
	description: "Excentos is a guided selling solution designed to assist customers in identifying and selecting specific products.",
	icon: "Excentos.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "excentos:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("service\\.excentos\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "excentos:jsGlobal:1",
			kind: "jsGlobal",
			property: "_excentosPAQ",
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
