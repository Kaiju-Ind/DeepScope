import type { TechnologyDefinition } from '../../types';

export const veroTechnologyDefinition = {
	id: "vero",
	name: "Vero",
	website: "https://www.getvero.com/",
	description: "Vero is a tool that tracks user actions and targets emails, allowing you to send more personalised emails to customers based on their behaviour.",
	icon: "Vero.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "vero:jsGlobal:0",
			kind: "jsGlobal",
			property: "__vero",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vero:jsGlobal:1",
			kind: "jsGlobal",
			property: "_veroq",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
