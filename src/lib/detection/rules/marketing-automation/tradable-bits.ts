import type { TechnologyDefinition } from '../../types';

export const tradableBitsTechnologyDefinition = {
	id: "tradable-bits",
	name: "Tradable Bits",
	website: "https://tradablebits.com",
	description: "Tradable Bits is a platform that integrates content marketing, e-commerce, CRM, and targeted communication into a unified system.",
	icon: "TradableBits.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "tradable-bits:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tradablebits\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
