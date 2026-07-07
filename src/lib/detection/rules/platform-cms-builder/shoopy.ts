import type { TechnologyDefinition } from '../../types';

export const shoopyTechnologyDefinition = {
	id: "shoopy",
	name: "Shoopy",
	website: "https://www.shoopy.in",
	description: "Shoopy is an all-in-one ecommerce Solution for online and offline business.",
	icon: "Shoopy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shoopy:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.store\\.shoopy\\.in"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
