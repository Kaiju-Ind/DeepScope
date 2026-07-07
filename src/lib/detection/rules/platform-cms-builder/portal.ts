import type { TechnologyDefinition } from '../../types';

export const portalTechnologyDefinition = {
	id: "portal",
	name: "Portal",
	website: "https://www.portal.ir",
	description: "Portal is a platform providing necessary tools for crafting professional websites or online stores, encompassing hosting, domain registration, an intuitive management panel for creating new pages, and ongoing support.",
	icon: "Portal.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "portal:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Portal Site Builder", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "portal:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^portal site builder", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
