import type { TechnologyDefinition } from '../../types';

export const followUpBossTechnologyDefinition = {
	id: "follow-up-boss",
	name: "Follow Up Boss",
	website: "https://www.followupboss.com/customer-results/debra-beagle",
	description: "Follow Up Boss is a real estate CRM system that manages leads, tracks client interactions, and organizes sales processes for real estate professionals.",
	icon: "FollowUpBoss.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "follow-up-boss:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.followupboss\\.com"),
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
