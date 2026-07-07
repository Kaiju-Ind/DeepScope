import type { TechnologyDefinition } from '../../types';

export const aidenTechnologyDefinition = {
	id: "aiden",
	name: "Aiden",
	website: "https://www.aiden.cx",
	description: "Aiden is a tool designed for ecommerce, guiding customers in finding the right products, similar to an in-store experience, which helps improve conversion rates.",
	icon: "Aiden.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "aiden:jsGlobal:0",
			kind: "jsGlobal",
			property: "_aiden.push",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "aiden:jsGlobal:1",
			kind: "jsGlobal",
			property: "_aidenApp.openAdvisor",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
