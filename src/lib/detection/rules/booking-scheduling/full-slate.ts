import type { TechnologyDefinition } from '../../types';

export const fullSlateTechnologyDefinition = {
	id: "full-slate",
	name: "Full Slate",
	website: "https://www.fullslate.com",
	description: "Full Slate is an appointment scheduling software designed to help businesses manage bookings, client information, and availability.",
	icon: "FullSlate.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "full-slate:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.fullslate\\.com"),
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
