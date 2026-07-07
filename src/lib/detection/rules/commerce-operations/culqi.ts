import type { TechnologyDefinition } from '../../types';

export const culqiTechnologyDefinition = {
	id: "culqi",
	name: "Culqi",
	website: "https://culqi.com",
	description: "Culqi is a payment processing platform that enables businesses to accept card payments and receive funds on the same day.",
	icon: "Culqi.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "culqi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.culqi\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "culqi:jsGlobal:1",
			kind: "jsGlobal",
			property: "Culqi3DS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "culqi:jsGlobal:2",
			kind: "jsGlobal",
			property: "CulqiCheckout",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
