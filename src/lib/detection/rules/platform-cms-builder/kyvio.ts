import type { TechnologyDefinition } from '../../types';

export const kyvioTechnologyDefinition = {
	id: "kyvio",
	name: "Kyvio",
	website: "https://kyvio.com",
	description: "Kyvio is a platform for creating membership websites and constructing marketing funnels.",
	icon: "Kyvio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kyvio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.kyvio\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
