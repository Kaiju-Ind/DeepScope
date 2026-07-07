import type { TechnologyDefinition } from '../../types';

export const theRaveTechnologyDefinition = {
	id: "the-rave",
	name: "The Rave",
	website: "https://therave.co",
	description: "The Rave is a platform offering affiliate, referral, and user-generated content tools to set up post-purchase incentives.",
	icon: "TheRave.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "the-rave:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("scripts\\.therave\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "the-rave:jsGlobal:1",
			kind: "jsGlobal",
			property: "raveStateManager",
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
