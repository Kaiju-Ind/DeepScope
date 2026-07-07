import type { TechnologyDefinition } from '../../types';

export const level5TechnologyDefinition = {
	id: "level-5",
	name: "Level 5",
	website: "https://level5advertising.com/websites/",
	description: "Level 5 is a page builder constructed with WordPress and powered with WP Engine hosting featuring advanced caching and performance optimisation.",
	icon: "Level 5.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "level-5:jsGlobal:0",
			kind: "jsGlobal",
			property: "l5_inventory_url",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
