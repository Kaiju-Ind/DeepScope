import type { TechnologyDefinition } from '../../types';

export const animaTechnologyDefinition = {
	id: "anima",
	name: "Anima",
	website: "https://www.animaapp.com/",
	description: "Anima is an AI-powered tool designed to assist users in converting their designs into functional code, creating interactive prototypes, and streamlining the automation of design systems.",
	icon: "Anima.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "anima:jsGlobal:0",
			kind: "jsGlobal",
			property: "__ANIMA_PROJECT_DATA__",
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
