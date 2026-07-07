import type { TechnologyDefinition } from '../../types';

export const financeadsTechnologyDefinition = {
	id: "financeads",
	name: "FinanceAds",
	website: "https://www.financeads.com",
	description: "FinanceAds is a performance marketing agency that has grown affiliate network for the financial sector.",
	icon: "Financeads.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "financeads:dom:0",
			kind: "dom",
			selector: "link[href*='js.financeads.net'], link[href*='js.financeads.com'], a[href*='www.financeads.net/tc.php']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
