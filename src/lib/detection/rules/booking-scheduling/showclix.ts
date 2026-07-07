import type { TechnologyDefinition } from '../../types';

export const showclixTechnologyDefinition = {
	id: "showclix",
	name: "ShowClix",
	website: "https://www.showclix.com",
	description: "ShoClix is a full-service event ticketing platform that provides tools for managing ticket sales, event promotion, and attendee registration.",
	icon: "ShowClix.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "showclix:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.showclix\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
