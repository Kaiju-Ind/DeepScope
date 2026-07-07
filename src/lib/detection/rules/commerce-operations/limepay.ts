import type { TechnologyDefinition } from '../../types';

export const limepayTechnologyDefinition = {
	id: "limepay",
	name: "Limepay",
	website: "https://www.limepay.com.au",
	description: "Limepay is a buy now, pay later platform that's fully integrated with the merchant's payment platform.",
	icon: "Limepay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "limepay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/Limepay-v\\d+\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "limepay:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/limepay-installment-show\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "limepay:jsGlobal:2",
			kind: "jsGlobal",
			property: "LimepayIdentity",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "limepay:jsGlobal:3",
			kind: "jsGlobal",
			property: "wc_ga_pro.available_gateways.limepay",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "limepay:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/limepay-v\\d+\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
