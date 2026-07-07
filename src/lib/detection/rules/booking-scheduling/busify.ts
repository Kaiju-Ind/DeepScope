import type { TechnologyDefinition } from '../../types';

export const busifyTechnologyDefinition = {
	id: "busify",
	name: "Busify",
	website: "https://www.busify.com",
	description: "Busify is a bus software platform that enables operators to issue tickets, enhance customer experiences, and manage fleets.",
	icon: "Busify.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "busify:dom:0",
			kind: "dom",
			selector: "iframe[src*='.app.busify.com/'], link[href*='app.busify.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
