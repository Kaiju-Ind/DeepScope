import type { TechnologyDefinition } from '../../types';

export const supportHeroTechnologyDefinition = {
	id: "support-hero",
	name: "Support Hero",
	website: "https://www.supporthero.com/",
	description: "Support Hero is a knowledge base solution to reduce inbound support requests.",
	icon: "Support Hero.png",
	categories: [
		"content-publishing",
		"developer-tooling",
	],
	rules: [
		{
			id: "support-hero:dom:0",
			kind: "dom",
			selector: "a[href*='.supporthero.io/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "support-hero:jsGlobal:1",
			kind: "jsGlobal",
			property: "supportHeroWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "support-hero:jsGlobal:2",
			kind: "jsGlobal",
			property: "supporthero",
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
