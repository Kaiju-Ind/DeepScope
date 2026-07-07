import type { TechnologyDefinition } from '../../types';

export const cardinaTechnologyDefinition = {
	id: "cardina",
	name: "Cardina",
	website: "https://cardina.com",
	description: "Cardina is a screen-sharing and cobrowsing tool that enables agents to see, draw on, and guide a customer’s screen during phone or live chat interactions without requiring customer actions.",
	icon: "Cardina.svg",
	categories: [
		"network-hardware",
	],
	rules: [
		{
			id: "cardina:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.cohere\\.so"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cardina:jsGlobal:1",
			kind: "jsGlobal",
			property: "Cohere.addCallStatusListener",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
