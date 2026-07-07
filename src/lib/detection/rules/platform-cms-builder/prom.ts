import type { TechnologyDefinition } from '../../types';

export const promTechnologyDefinition = {
	id: "prom",
	name: "Prom",
	website: "https://prom.ua",
	description: "Prom is a marketplace system from Ukraine that provides an online platform for businesses and consumers to buy and sell goods.",
	icon: "Prom.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "prom:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("tracker\\.prom\\.ua"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
