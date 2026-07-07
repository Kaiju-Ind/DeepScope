import type { TechnologyDefinition } from '../../types';

export const nextTotalTechnologyDefinition = {
	id: "next-total",
	name: "Next Total",
	website: "https://www.next.co.uk",
	description: "Next is leveraging the expertise, infrastructure and software it has developed for its own online business to provide a third-party ecommerce outsourcing service named Total Platform.",
	icon: "Next Total.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "next-total:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.nextdirect\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "next-total:jsGlobal:1",
			kind: "jsGlobal",
			property: "NextBasket.NextUnlimited",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "next-total:jsGlobal:2",
			kind: "jsGlobal",
			property: "NextFavourites.Busy",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "next-total:jsGlobal:3",
			kind: "jsGlobal",
			property: "NextFavourites.Data.ShoppingLists",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
