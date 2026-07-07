import type { TechnologyDefinition } from '../../types';

export const titoTechnologyDefinition = {
	id: "tito",
	name: "Tito",
	website: "https://ti.to",
	description: "Tito is an event software platform that provides a solution for selling tickets online.",
	icon: "Tito.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "tito:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.tito\\.io\\/v([\\d.]+)"),
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
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
