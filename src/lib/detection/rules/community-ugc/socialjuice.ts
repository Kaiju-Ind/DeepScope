import type { TechnologyDefinition } from '../../types';

export const socialjuiceTechnologyDefinition = {
	id: "socialjuice",
	name: "SocialJuice",
	website: "https://socialjuice.io",
	description: "SocialJuice is a simple tool to collect video testimonials or textual testimonials from your clients.",
	icon: "SocialJuice.svg",
	categories: [
		"community-ugc",
		"widgets-misc",
	],
	rules: [
		{
			id: "socialjuice:dom:0",
			kind: "dom",
			selector: "iframe[src*='embed.socialjuice.io/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
