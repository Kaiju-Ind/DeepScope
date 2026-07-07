import type { TechnologyDefinition } from '../../types';

export const spinnakrTechnologyDefinition = {
	id: "spinnakr",
	name: "Spinnakr",
	website: "https://www.spinnakr.com",
	description: "Spinnakr is a startup with a platform designed to personalise messages on blogs and websites.",
	icon: "Spinnakr.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "spinnakr:jsGlobal:0",
			kind: "jsGlobal",
			property: "_spinnakr_site_id",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
