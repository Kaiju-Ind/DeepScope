import type { TechnologyDefinition } from '../../types';

export const placedTechnologyDefinition = {
	id: "placed",
	name: "Placed",
	website: "https://www.placed.com",
	description: "Placed is a solution that provides advertising insights to help businesses understand and measure the impact of their marketing efforts.",
	icon: "Placed.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "placed:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.placed\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
