import type { TechnologyDefinition } from '../../types';

export const trustlockTechnologyDefinition = {
	id: "trustlock",
	name: "TrustLock",
	website: "https://trustlock.co",
	description: "TrustLock is a website tool designed to help increase sales and conversions across various platforms through trust-based elements and user engagement features.",
	icon: "TrustLock.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "trustlock:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.trustlock\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trustlock:dom:1",
			kind: "dom",
			selector: "iframe[src*='app.trustlock.co']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
