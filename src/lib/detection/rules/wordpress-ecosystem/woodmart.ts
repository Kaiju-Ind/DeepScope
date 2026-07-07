import type { TechnologyDefinition } from '../../types';

export const woodmartTechnologyDefinition = {
	id: "woodmart",
	name: "Woodmart",
	website: "https://woodmart.xtemos.com",
	description: "Woodmart is a multipurpose WordPress theme offering for website creation and customization.",
	icon: "Woodmart.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "woodmart:jsGlobal:0",
			kind: "jsGlobal",
			property: "woodmartThemeModule",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "woodmart:jsGlobal:1",
			kind: "jsGlobal",
			property: "woodmart_settings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
		],
		cpe: "cpe:2.3:a:xtemos:woodmart:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
