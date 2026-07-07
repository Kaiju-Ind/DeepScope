import type { TechnologyDefinition } from '../../types';

export const priiceTechnologyDefinition = {
	id: "priice",
	name: "Priice",
	website: "https://priice.net",
	description: "Priice is a widget that tracks and monitors product prices, providing up-to-date information for comparison and analysis.",
	icon: "Priice.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "priice:dom:0",
			kind: "dom",
			selector: "link[href*='cdn.priice.net']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
