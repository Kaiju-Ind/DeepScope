import type { TechnologyDefinition } from '../../types';

export const shippyproTechnologyDefinition = {
	id: "shippypro",
	name: "ShippyPro",
	website: "https://www.shippypro.com",
	description: "ShippyPro is the complete shipping software for ecommerce that helps worldwide merchants to ship, track, and manage returns for their orders.",
	icon: "ShippyPro.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "shippypro:dom:0",
			kind: "dom",
			selector: "a[href*='.shippypro.com/return-form.html']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "shippypro:jsGlobal:1",
			kind: "jsGlobal",
			property: "ShippyProReturnForm",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
