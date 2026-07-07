import type { TechnologyDefinition } from '../../types';

export const userbackTechnologyDefinition = {
	id: "userback",
	name: "Userback",
	website: "https://userback.io",
	description: "Userback is a platform offering visual feedback and bug tracking solutions for websites and web applications, allowing users to provide feedback through screenshots and annotations.",
	icon: "Userback.svg",
	categories: [
		"surveys-feedback",
		"developer-tooling",
	],
	rules: [
		{
			id: "userback:jsGlobal:0",
			kind: "jsGlobal",
			property: "Userback.access_token",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
