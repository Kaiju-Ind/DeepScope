import type { TechnologyDefinition } from '../../types';

export const relevaTechnologyDefinition = {
	id: "releva",
	name: "Releva",
	website: "https://releva.ai",
	description: "Releva is a marketing automation platform for ecommerce that uses AI to manage revenue in real time and automate brand communication.",
	icon: "Releva.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "releva:jsGlobal:0",
			kind: "jsGlobal",
			property: "Releva.clearCookies",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
