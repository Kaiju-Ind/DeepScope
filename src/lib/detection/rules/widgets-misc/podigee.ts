import type { TechnologyDefinition } from '../../types';

export const podigeeTechnologyDefinition = {
	id: "podigee",
	name: "Podigee",
	website: "https://www.podigee.com",
	description: "Podigee is an independent company for podcast publishers. Podigee offers hosting, distribution, analytics and monetisation of podcasts.",
	icon: "Podigee.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "podigee:dom:0",
			kind: "dom",
			selector: "iframe[src*='cdn.podigee.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "podigee:jsGlobal:1",
			kind: "jsGlobal",
			property: "podigeePodcastPlayers",
			description: "Page-owned global matches a known technology marker.",
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
