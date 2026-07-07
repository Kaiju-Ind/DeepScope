import type { TechnologyDefinition } from '../../types';

export const payvaTechnologyDefinition = {
	id: "payva",
	name: "Payva",
	website: "https://www.payva.com",
	description: "Payva is a Buy Now, Pay Later platform designed for creators, offering structured payment options tailored to creative work.",
	icon: "Payva.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "payva:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("checkout-sdk\\.payva\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "payva:jsGlobal:1",
			kind: "jsGlobal",
			property: "Payva",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
