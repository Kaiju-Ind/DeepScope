import type { TechnologyDefinition } from '../../types';

export const planfyTechnologyDefinition = {
	id: "planfy",
	name: "Planfy",
	website: "https://www.planfy.com",
	description: "Planfy is a booking system for businesses designed to streamline appointment scheduling and customer management.",
	icon: "Planfy.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "planfy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.planfy\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "planfy:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("www\\.planfy\\.com"),
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
