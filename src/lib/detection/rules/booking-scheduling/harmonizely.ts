import type { TechnologyDefinition } from '../../types';

export const harmonizelyTechnologyDefinition = {
	id: "harmonizely",
	name: "Harmonizely",
	website: "https://harmonizely.com",
	description: "Harmonizely is a scheduling system that enables online appointment booking, calendar management, and time coordination through a web-based interface.",
	icon: "Harmonizely.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "harmonizely:dom:0",
			kind: "dom",
			selector: "link[href*='app.harmonizely.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
