import type { TechnologyDefinition } from '../../types';

export const trustedShopsTechnologyDefinition = {
	id: "trusted-shops",
	name: "Trusted Shops",
	website: "https://www.trustedshops.co.uk",
	description: "Trusted Shops is a company that acts as a 3'rd party representing the common interests of both consumers and retailers.",
	icon: "Trusted Shops.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "trusted-shops:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widgets\\.trustedshops\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
