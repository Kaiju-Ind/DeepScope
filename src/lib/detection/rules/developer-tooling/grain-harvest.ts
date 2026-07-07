import type { TechnologyDefinition } from '../../types';

export const grainHarvestTechnologyDefinition = {
	id: "grain-harvest",
	name: "Grain Harvest",
	website: "https://graindata.com",
	description: "Grain Harvest is an online platform that provides data science tools and resources for professionals and learners in the field.",
	icon: "GrainData.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "grain-harvest:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.harvest\\.graindata\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
