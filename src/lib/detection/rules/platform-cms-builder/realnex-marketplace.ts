import type { TechnologyDefinition } from '../../types';

export const realnexMarketplaceTechnologyDefinition = {
	id: "realnex-marketplace",
	name: "RealNex MarketPlace",
	website: "https://realnex.com",
	description: "RealNex Marketplace is a platform for buying, selling, leasing, and transacting in commercial real estate, offering advanced search tools, alerts for new listings, and automated matching based on user-defined criteria.",
	icon: "RealNex.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "realnex-marketplace:jsGlobal:0",
			kind: "jsGlobal",
			property: "NEX_MAP_ID",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
