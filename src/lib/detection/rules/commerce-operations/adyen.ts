import type { TechnologyDefinition } from '../../types';

export const adyenTechnologyDefinition = {
	id: "adyen",
	name: "Adyen",
	website: "https://www.adyen.com",
	description: "Adyen allows businesses to accept ecommerce, mobile, and point-of-sale payments.",
	icon: "Adyen.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "adyen:jsGlobal:0",
			kind: "jsGlobal",
			property: "adyen.encrypt.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
