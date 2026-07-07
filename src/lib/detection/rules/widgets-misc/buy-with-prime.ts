import type { TechnologyDefinition } from '../../types';

export const buyWithPrimeTechnologyDefinition = {
	id: "buy-with-prime",
	name: "Buy with Prime",
	website: "https://buywithprime.amazon.com",
	description: "Buy with Prime is a feature offered by Amazon that allows Amazon Prime members to make purchases with the benefits associated with their Prime membership.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "buy-with-prime:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("code\\.buywithprime\\.amazon\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "buy-with-prime:jsGlobal:1",
			kind: "jsGlobal",
			property: "bwp.sku",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"recurring",
		],
	},
	implies: [
		"amazon-pay",
	],
} as const satisfies TechnologyDefinition;
