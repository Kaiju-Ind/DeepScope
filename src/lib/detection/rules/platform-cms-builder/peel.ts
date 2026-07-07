import type { TechnologyDefinition } from '../../types';

export const peelTechnologyDefinition = {
	id: "peel",
	name: "Peel",
	website: "https://www.peel.fr",
	description: "Peel is an open source shopping cart system.",
	icon: "Peel.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "peel:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("www\\.peel-shopping\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
