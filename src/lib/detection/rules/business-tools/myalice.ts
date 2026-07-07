import type { TechnologyDefinition } from '../../types';

export const myaliceTechnologyDefinition = {
	id: "myalice",
	name: "MyAlice",
	website: "https://www.myalice.ai",
	description: "MyAlice is a customer support platform designed for ecommerce brands to manage and streamline customer service operations.",
	icon: "MyAlice.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "myalice:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.myalice\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "myalice:jsGlobal:1",
			kind: "jsGlobal",
			property: "MyAliceWebChat",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
