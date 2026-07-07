import type { TechnologyDefinition } from '../../types';

export const relapTechnologyDefinition = {
	id: "relap",
	name: "Relap",
	website: "https://relap.io",
	description: "Relap is an advertising effectiveness system that focuses on optimizing content recommendations and increasing user engagement.",
	icon: "Relap.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "relap:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/relap\\.io\\/v([\\d]+)\\/relap\\.js"),
			version: {
				source: "match",
				group: 1,
			},
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
