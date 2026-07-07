import type { TechnologyDefinition } from '../../types';

export const conneqtoTechnologyDefinition = {
	id: "conneqto",
	name: "Conneqto",
	website: "https://conneqto.ai",
	description: "Conneqto is an all-in-one platform offering email, automation, high-converting carts, and sales pipeline tools for streamlined marketing and sales management.",
	icon: "Conneqto.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "conneqto:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.conneqto\\.ai"),
			description: "Script content contains a bounded technology signature.",
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
