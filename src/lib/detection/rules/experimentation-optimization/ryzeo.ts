import type { TechnologyDefinition } from '../../types';

export const ryzeoTechnologyDefinition = {
	id: "ryzeo",
	name: "Ryzeo",
	website: "https://ryzeo.com",
	description: "Ryzeo is an AI-powered platform that delivers personalized product recommendations to help convert website visitors into customers.",
	icon: "Ryzeo.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "ryzeo:dom:0",
			kind: "dom",
			selector: "link[href*='stats.ryzeo.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "ryzeo:jsGlobal:1",
			kind: "jsGlobal",
			property: "ryzeoSubmit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
