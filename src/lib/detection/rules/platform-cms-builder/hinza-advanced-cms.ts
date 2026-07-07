import type { TechnologyDefinition } from '../../types';

export const hinzaAdvancedCmsTechnologyDefinition = {
	id: "hinza-advanced-cms",
	name: "Hinza Advanced CMS",
	website: "https://hinzaco.com",
	icon: "hinza_advanced_cms.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "hinza-advanced-cms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("hinzacms", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"laravel",
	],
} as const satisfies TechnologyDefinition;
