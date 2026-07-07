import type { TechnologyDefinition } from '../../types';

export const wolfeoTechnologyDefinition = {
	id: "wolfeo",
	name: "Wolfeo",
	website: "https://wolfeo.fr",
	description: "Wolfeo is an online platform for selling digital products and services, catering to coaches, consultants, and entrepreneurs.",
	icon: "Wolfeo.svg",
	categories: [
		"marketing-automation",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "wolfeo:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^wolfeo_new_session_5$", "i"),
			description: "Cookie name matches a known technology marker.",
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
