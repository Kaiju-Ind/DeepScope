import type { TechnologyDefinition } from '../../types';

export const infogramTechnologyDefinition = {
	id: "infogram",
	name: "Infogram",
	website: "https://infogram.com",
	description: "Infogram is a web-based data visualisation and infographics platform.",
	icon: "Infogram.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "infogram:dom:0",
			kind: "dom",
			selector: "iframe[src*='.infogram.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "infogram:jsGlobal:1",
			kind: "jsGlobal",
			property: "InfogramEmbeds",
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
