import type { TechnologyDefinition } from '../../types';

export const grooveCmTechnologyDefinition = {
	id: "groove-cm",
	name: "Groove.cm",
	website: "https://groove.cm",
	description: "Groove.cm is a platform providing marketing, sales, and business tools without upfront costs, enabling businesses to focus on scaling.",
	icon: "GrooveCM.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "groove-cm:dom:0",
			kind: "dom",
			selector: "iframe[src*='app.groove.cm']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
