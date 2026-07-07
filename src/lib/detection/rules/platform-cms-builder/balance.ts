import type { TechnologyDefinition } from '../../types';

export const balanceTechnologyDefinition = {
	id: "balance",
	name: "Balance",
	website: "https://www.getbalance.com",
	description: "Balance is a B2B commerce platform that provides payment and checkout infrastructure designed to streamline transactions between businesses.",
	icon: "Balance.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "balance:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getbalance\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "balance:jsGlobal:1",
			kind: "jsGlobal",
			property: "balanceSDK.checkout",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
