import type { TechnologyDefinition } from '../../types';

export const tallentorTechnologyDefinition = {
	id: "tallentor",
	name: "Tallentor",
	website: "https://tallentor.com",
	description: "Tallentor is a subscription-based software website analytics, heatmap, channel chat intergration.",
	icon: "Tallentor.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "tallentor:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tallentor\\.com\\/js\\/script_tracker\\.js"),
			description: "Script source URL matches a known technology marker.",
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
