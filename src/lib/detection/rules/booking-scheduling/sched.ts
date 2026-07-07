import type { TechnologyDefinition } from '../../types';

export const schedTechnologyDefinition = {
	id: "sched",
	name: "Sched",
	website: "https://sched.com",
	description: "Sched is an AI-powered platform that provides an all-in-one toolkit for event planning.",
	icon: "Sched.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "sched:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sched\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sched:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.sched\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
