import type { TechnologyDefinition } from '../../types';

export const googleWalletTechnologyDefinition = {
	id: "google-wallet",
	name: "Google Wallet",
	website: "https://wallet.google.com",
	icon: "Google Wallet.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "google-wallet:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("checkout\\.google\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "google-wallet:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("wallet\\.google\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
