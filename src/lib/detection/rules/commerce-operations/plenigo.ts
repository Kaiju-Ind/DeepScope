import type { TechnologyDefinition } from '../../types';

export const plenigoTechnologyDefinition = {
	id: "plenigo",
	name: "Plenigo",
	website: "https://plenigo.com",
	description: "Plenigo is a subscription management platform designed for modern reader financing.",
	icon: "Plenigo.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "plenigo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.plenigo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "plenigo:jsGlobal:1",
			kind: "jsGlobal",
			property: "plenigo.Checkout",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "plenigo:jsGlobal:2",
			kind: "jsGlobal",
			property: "plenigoStartCheckout",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
