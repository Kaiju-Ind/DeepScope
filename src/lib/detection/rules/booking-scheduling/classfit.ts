import type { TechnologyDefinition } from '../../types';

export const classfitTechnologyDefinition = {
	id: "classfit",
	name: "ClassFit",
	website: "https://classfit.com",
	description: "ClassFit is a provider of a booking and scheduling software for fitness centers.",
	icon: "ClassFit.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "classfit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.classfit\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "classfit:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.classfit\\.com"),
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
