import type { TechnologyDefinition } from '../../types';

export const unboundCommerceTechnologyDefinition = {
	id: "unbound-commerce",
	name: "Unbound Commerce",
	website: "https://www.unboundcommerce.com",
	description: "Unbound Commerce is a mobile and ecommerce provider for retailers.",
	icon: "UnboundCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "unbound-commerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.unboundcommerce\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "unbound-commerce:dom:1",
			kind: "dom",
			selector: "link[href*='.unboundcommerce.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
