import type { TechnologyDefinition } from '../../types';

export const venlyTechnologyDefinition = {
	id: "venly",
	name: "Venly",
	website: "https://www.venly.io",
	description: "Venly is a blockchain technology provider creating products to help companies succeed in Web3.",
	icon: "Venly.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "venly:jsGlobal:0",
			kind: "jsGlobal",
			property: "VenlyConnect",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "venly:meta:1",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^Venly$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "venly:meta:2",
			kind: "meta",
			key: "application-name",
			valuePattern: new RegExp("^venly$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
