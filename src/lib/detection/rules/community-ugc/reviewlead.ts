import type { TechnologyDefinition } from '../../types';

export const reviewleadTechnologyDefinition = {
	id: "reviewlead",
	name: "ReviewLead",
	website: "https://get.reviewlead.com",
	description: "ReviewLead is a platform that boosts reputation by systematically requesting reviews from past customers.",
	icon: "ReviewLead.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "reviewlead:dom:0",
			kind: "dom",
			selector: "div[data-url*='www.reviewlead.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
