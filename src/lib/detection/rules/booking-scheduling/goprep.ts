import type { TechnologyDefinition } from '../../types';

export const goprepTechnologyDefinition = {
	id: "goprep",
	name: "GoPrep",
	website: "https://goprep.com",
	description: "GoPrep is a meal prep software tailored for the Meal Preparation & Delivery industry.",
	icon: "GoPrep.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "goprep:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^goprep_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
