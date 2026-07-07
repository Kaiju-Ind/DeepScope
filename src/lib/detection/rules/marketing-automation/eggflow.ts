import type { TechnologyDefinition } from '../../types';

export const eggflowTechnologyDefinition = {
	id: "eggflow",
	name: "Eggflow",
	website: "https://eggflow.com",
	description: "Eggflow is a platform that offers marketing automation and customer engagement tools to help increase ecommerce revenue.",
	icon: "Eggflow.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "eggflow:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.eggflow\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "eggflow:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.eggflow\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
