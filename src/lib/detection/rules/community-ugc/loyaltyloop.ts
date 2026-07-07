import type { TechnologyDefinition } from '../../types';

export const loyaltyloopTechnologyDefinition = {
	id: "loyaltyloop",
	name: "LoyaltyLoop",
	website: "https://loyaltyloop.com",
	description: "LoyaltyLoop is an online review management platform that leverages customer loyalty surveys and Net Promoter Score tracking to enhance business reputation and strengthen customer relationships.",
	icon: "LoyaltyLoop.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "loyaltyloop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.loyaltyloop\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "loyaltyloop:jsGlobal:1",
			kind: "jsGlobal",
			property: "LoyaltyLoopEventListenerInitialized",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "loyaltyloop:jsGlobal:2",
			kind: "jsGlobal",
			property: "countOfLoyaltyLoopTestimonialWidgets",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
