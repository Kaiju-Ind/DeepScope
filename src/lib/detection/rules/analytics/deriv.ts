import type { TechnologyDefinition } from '../../types';

export const derivTechnologyDefinition = {
	id: "deriv",
	name: "Deriv",
	website: "https://deriv.com",
	description: "Deriv is an online platform that allows users to track trading activities.",
	icon: "Deriv.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "deriv:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("track\\.deriv\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
