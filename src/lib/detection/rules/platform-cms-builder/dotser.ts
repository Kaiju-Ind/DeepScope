import type { TechnologyDefinition } from '../../types';

export const dotserTechnologyDefinition = {
	id: "dotser",
	name: "Dotser",
	website: "https://www.dotser.ie",
	description: "Dotser is a web software development company specialising in ecommerce and cloud-based business solutions.",
	icon: "Dotser.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "dotser:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Dotser\\sCommerce\\s((?:\\d+\\.)+\\d+)\\/", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "dotser:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^dotser\\scommerce\\s((?:\\d+\\.)+\\d+)\\/", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
