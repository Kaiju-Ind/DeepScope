import type { TechnologyDefinition } from '../../types';

export const buyapowaTechnologyDefinition = {
	id: "buyapowa",
	name: "Buyapowa",
	website: "https://www.buyapowa.com",
	description: "Buyapowa is a scalable referral marketing and advocacy platform designed for all industries.",
	icon: "Buyapowa.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "buyapowa:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.co-buying\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "buyapowa:jsGlobal:1",
			kind: "jsGlobal",
			property: "Buyapowa.CanaryCheck",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
