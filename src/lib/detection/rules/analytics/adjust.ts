import type { TechnologyDefinition } from '../../types';

export const adjustTechnologyDefinition = {
	id: "adjust",
	name: "Adjust",
	website: "https://www.adjust.com",
	description: "Adjust is the mobile marketing analytics platform.",
	icon: "Adjust.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "adjust:dom:0",
			kind: "dom",
			selector: "div[data-adjust*='app.adjust.com/'], a[href*='app.adjust.com/'], a[href*='.adj.st/'], form[action*='app.adjust.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "adjust:jsGlobal:1",
			kind: "jsGlobal",
			property: "Adjust.initSdk",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
