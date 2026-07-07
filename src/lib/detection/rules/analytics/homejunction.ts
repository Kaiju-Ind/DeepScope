import type { TechnologyDefinition } from '../../types';

export const homejunctionTechnologyDefinition = {
	id: "homejunction",
	name: "HomeJunction",
	website: "https://www.homejunction.com",
	description: "HomeJunction is a provider of data applications for the real estate industry.",
	icon: "HomeJunction.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "homejunction:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.homejunction\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
