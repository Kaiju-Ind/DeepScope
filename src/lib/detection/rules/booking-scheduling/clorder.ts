import type { TechnologyDefinition } from '../../types';

export const clorderTechnologyDefinition = {
	id: "clorder",
	name: "Clorder",
	website: "https://www.clorder.com",
	description: "Clorder is a digital platform for ordering and marketing designed to reduce costs and enhance sales for businesses.",
	icon: "Clorder.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "clorder:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.clorder\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
