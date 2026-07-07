import type { TechnologyDefinition } from '../../types';

export const chameleonSystemTechnologyDefinition = {
	id: "chameleon-system",
	name: "Chameleon system",
	website: "https://www.chameleon-system.de",
	description: "Chameleon system is an ecommerce and content management system all-in-one, capable of being integrated straight from the manufacturer.",
	icon: "Chameleon system.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "chameleon-system:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Chameleon CMS\\/Shop System", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "chameleon-system:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("chameleon cms\\/shop system", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
