import type { TechnologyDefinition } from '../../types';

export const promoAiTechnologyDefinition = {
	id: "promo-ai",
	name: "Promo AI",
	website: "https://promo.com",
	description: "Promo AI is a tool that generates, schedules, and publishes professional videos across platforms, designed to support business marketing efforts.",
	icon: "Promo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "promo-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ak04-promo-cdn\\.slidely\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
