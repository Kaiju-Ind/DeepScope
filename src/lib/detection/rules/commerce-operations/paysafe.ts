import type { TechnologyDefinition } from '../../types';

export const paysafeTechnologyDefinition = {
	id: "paysafe",
	name: "Paysafe",
	website: "https://www.paysafe.com/en",
	description: "Paysafe is a payment platform that enables businesses and consumers to connect and transact by payment processing, digital wallet, and online cash solutions.",
	icon: "paysafe.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "paysafe:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/hosted\\.paysafe\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "paysafe:jsGlobal:1",
			kind: "jsGlobal",
			property: "paysafe",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "paysafe:jsGlobal:2",
			kind: "jsGlobal",
			property: "paysafe.checkout",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "paysafe:jsGlobal:3",
			kind: "jsGlobal",
			property: "paysafe.fields",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "paysafe:jsGlobal:4",
			kind: "jsGlobal",
			property: "paysafe.threedsecure",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
