import type { TechnologyDefinition } from '../../types';

export const bookbanketTechnologyDefinition = {
	id: "bookbanket",
	name: "BookBanket",
	website: "https://bookbanket.ru",
	description: "BookBanket is a banquet management service designed to coordinate event planning and organize venue arrangements.",
	icon: "BookBanket.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "bookbanket:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.bbanket\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bookbanket:jsGlobal:1",
			kind: "jsGlobal",
			property: "bbanketMetrikaIdInc",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bookbanket:jsGlobal:2",
			kind: "jsGlobal",
			property: "bbanketWidget.addStyle",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
