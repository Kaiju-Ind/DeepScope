import type { TechnologyDefinition } from '../../types';

export const vibecommerceTechnologyDefinition = {
	id: "vibecommerce",
	name: "vibecommerce",
	website: "https://vibecommerce.com.br",
	icon: "vibecommerce.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vibecommerce:meta:0",
			kind: "meta",
			key: "designer",
			valuePattern: new RegExp("vibecommerce", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "vibecommerce:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("vibecommerce", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
	excludes: [
		"prestashop",
	],
} as const satisfies TechnologyDefinition;
