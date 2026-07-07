import type { TechnologyDefinition } from '../../types';

export const helpComTechnologyDefinition = {
	id: "help-com",
	name: "Help.com",
	website: "https://www.help.com",
	description: "Help.com is a service that provides domain name registration and website hosting with simplified setup and management.",
	icon: "Help.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "help-com:jsGlobal:0",
			kind: "jsGlobal",
			property: "Helpdotcom",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
