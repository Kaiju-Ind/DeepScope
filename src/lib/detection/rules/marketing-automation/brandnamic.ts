import type { TechnologyDefinition } from '../../types';

export const brandnamicTechnologyDefinition = {
	id: "brandnamic",
	name: "Brandnamic",
	website: "https://www.brandnamic.com",
	description: "Brandnamic is a hospitality platform that provides software, marketing, and consulting services for managing operations, customer engagement, and digital presence.",
	icon: "Brandnamic.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "brandnamic:jsGlobal:0",
			kind: "jsGlobal",
			property: "brandnamic.constants",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "brandnamic:meta:1",
			kind: "meta",
			key: "publisher",
			valuePattern: new RegExp("^Brandnamic GmbH", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
