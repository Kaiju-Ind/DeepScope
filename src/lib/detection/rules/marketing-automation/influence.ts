import type { TechnologyDefinition } from '../../types';

export const influenceTechnologyDefinition = {
	id: "influence",
	name: "Influence",
	website: "https://useinfluence.co",
	description: "Influence is a conversion optimisation tool for ecommerce that leverages real-time social proof.",
	icon: "Influence.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "influence:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.useinfluence\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "influence:jsGlobal:1",
			kind: "jsGlobal",
			property: "Influence",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
