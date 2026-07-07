import type { TechnologyDefinition } from '../../types';

export const northstarCivicTechnologyDefinition = {
	id: "northstar-civic",
	name: "NorthStar Civic",
	website: "https://northstarcivic.com",
	description: "NorthStar Civic is a custom content and digital asset management system supporting news websites across the NorthStar Civic Media network.",
	icon: "NorthStarCivic.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "northstar-civic:meta:0",
			kind: "meta",
			key: "cms",
			valuePattern: new RegExp("^NorthStar CMS$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "northstar-civic:meta:1",
			kind: "meta",
			key: "cms",
			valuePattern: new RegExp("^northstar cms$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
