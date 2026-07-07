import type { TechnologyDefinition } from '../../types';

export const flowTechnologyDefinition = {
	id: "flow",
	name: "Flow",
	website: "https://www.flow.io/",
	description: "Flow is an ecommerce platform that enables brands and retailers to sell their merchandise to customers internationally by creating localized shopping experiences.",
	icon: "Flow.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "flow:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:shopify-)?cdn\\.flow\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "flow:jsGlobal:1",
			kind: "jsGlobal",
			property: "flow.cart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "flow:jsGlobal:2",
			kind: "jsGlobal",
			property: "flow.countryPicker",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "flow:jsGlobal:3",
			kind: "jsGlobal",
			property: "flow_cart_localize",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
