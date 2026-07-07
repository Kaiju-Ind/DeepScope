import type { TechnologyDefinition } from '../../types';

export const storylaneTechnologyDefinition = {
	id: "storylane",
	name: "Storylane",
	website: "https://www.storylane.io",
	description: "Storylane is a platform facilitating the creation and distribution of interactive product demos tailored for SaaS sales and marketing teams.",
	icon: "Storylane.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "storylane:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.storylane\\.io\\/js\\/v(\\d+)\\/storylane\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "storylane:jsGlobal:1",
			kind: "jsGlobal",
			property: "Storylane",
			description: "Page-owned global matches a known technology marker.",
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
