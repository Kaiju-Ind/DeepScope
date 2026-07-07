import type { TechnologyDefinition } from '../../types';

export const omniwalletTechnologyDefinition = {
	id: "omniwallet",
	name: "OmniWallet",
	website: "https://omniwallet.net",
	description: "OmniWallet is an omnichannel loyalty SaaS platform that centralizes customer identification, incentive management, and behavioral tracking across online and offline channels.",
	icon: "OmniWallet.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "omniwallet:jsGlobal:0",
			kind: "jsGlobal",
			property: "Omniwallet.ADMIN_API",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "omniwallet:jsGlobal:1",
			kind: "jsGlobal",
			property: "OmniwalletPlugin",
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
