import type { TechnologyDefinition } from '../../types';

export const kleecksTechnologyDefinition = {
	id: "kleecks",
	name: "Kleecks",
	website: "https://www.kleecks.com",
	description: "Kleecks is a next-generation ecommerce performance and UX optimization platform designed to enhance site speed, streamline user interactions, and support scalable digital operations.",
	icon: "Kleecks.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kleecks:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.kleecks-stats\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kleecks:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Kleecks$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "kleecks:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^kleecks$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
