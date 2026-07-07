import type { TechnologyDefinition } from '../../types';

export const ingresseTechnologyDefinition = {
	id: "ingresse",
	name: "Ingresse",
	website: "https://ingresse.com",
	description: "Ingresse is a booking system that enables users to manage reservations.",
	icon: "Ingresse.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "ingresse:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ingresse\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ingresse:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.ingresse\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
