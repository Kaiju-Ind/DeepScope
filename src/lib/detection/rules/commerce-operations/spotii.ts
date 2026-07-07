import type { TechnologyDefinition } from '../../types';

export const spotiiTechnologyDefinition = {
	id: "spotii",
	name: "Spotii",
	website: "https://www.spotii.com/",
	description: "Spotii is a tech-enabled payments platform where anyone can Shop Now and Pay Later with absolutely zero interest or cost.",
	icon: "Spotii.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "spotii:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.spotii\\.me"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "spotii:jsGlobal:1",
			kind: "jsGlobal",
			property: "spotiiConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
