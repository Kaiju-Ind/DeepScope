import type { TechnologyDefinition } from '../../types';

export const crystalcommerceTechnologyDefinition = {
	id: "crystalcommerce",
	name: "CrystalCommerce",
	website: "https://www.crystalcommerce.com",
	description: "CrystalCommerce is a game store management platform that provides point-of-sale functionality and inventory management tools to support retail operations.",
	icon: "CrystalCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "crystalcommerce:meta:0",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^CrystalCommerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
