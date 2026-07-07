import type { TechnologyDefinition } from '../../types';

export const inforumobileTechnologyDefinition = {
	id: "inforumobile",
	name: "InforUMobile",
	website: "https://www.inforu.co.il",
	description: "InforUMobile is a multi-channel system that enables digital communication with customers, offering various channels for interacting and engaging with users, developed by the Shamir Systems Group.",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "inforumobile:dom:0",
			kind: "dom",
			selector: "iframe[src*='bot.frontcld.com/bot/chat']",
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
