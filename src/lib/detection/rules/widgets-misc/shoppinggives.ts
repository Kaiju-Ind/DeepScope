import type { TechnologyDefinition } from '../../types';

export const shoppinggivesTechnologyDefinition = {
	id: "shoppinggives",
	name: "ShoppingGives",
	website: "https://shoppinggives.com",
	description: "ShoppingGives is a B2B social ecommerce platform that allows companies of all sizes to make charitable donations through their customers' purchases.",
	icon: "ShoppingGives.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "shoppinggives:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.shoppinggives\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shoppinggives:jsGlobal:1",
			kind: "jsGlobal",
			property: "sgObservables.getCharities",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
