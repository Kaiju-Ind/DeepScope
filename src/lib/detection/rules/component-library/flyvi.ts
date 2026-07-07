import type { TechnologyDefinition } from '../../types';

export const flyviTechnologyDefinition = {
	id: "flyvi",
	name: "Flyvi",
	website: "https://flyvi.io",
	description: "Flyvi is a platform that generates visually engaging graphics optimized for social media.",
	icon: "Flyvi.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "flyvi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.flyvi\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
