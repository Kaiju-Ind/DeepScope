import type { TechnologyDefinition } from '../../types';

export const travelloTechnologyDefinition = {
	id: "travello",
	name: "Travello",
	website: "https://www.travello.com",
	description: "Travello is a booking platform that provides discounted travel options, tours, and holiday packages across multiple destinations worldwide.",
	icon: "Travello.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "travello:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.travelloapp\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
