import type { TechnologyDefinition } from '../../types';

export const gameballTechnologyDefinition = {
	id: "gameball",
	name: "Gameball",
	website: "https://www.gameball.co",
	description: "Gameball is a loyalty & retention platform that offers gamified customer engagement tools for customers such as rewards, points, and referrals.",
	icon: "Gameball.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "gameball:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.gameball\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gameball:jsGlobal:1",
			kind: "jsGlobal",
			property: "GbSdk.settings.shop",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gameball:jsGlobal:2",
			kind: "jsGlobal",
			property: "gbReferralCodeInput",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
