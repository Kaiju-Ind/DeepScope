import type { TechnologyDefinition } from '../../types';

export const buzClubTechnologyDefinition = {
	id: "buz-club",
	name: "Buz Club",
	website: "https://buzsoftware.com",
	description: "Buz Club is a provider of private club management software featuring real-time integration.",
	icon: "BuzClub.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "buz-club:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("secure\\.buzclubsoftware\\.com"),
			description: "Script source URL matches a known technology marker.",
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
