import type { TechnologyDefinition } from '../../types';

export const quotemediaTechnologyDefinition = {
	id: "quotemedia",
	name: "Quotemedia",
	website: "https://quotemedia.com",
	description: "Quotemedia is a provider of stock market data and research solutions for online brokerages, clearing firms, banks, media portals, public companies, and financial service corporations.",
	icon: "QuoteMedia.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "quotemedia:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("qmod\\.quotemedia\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
