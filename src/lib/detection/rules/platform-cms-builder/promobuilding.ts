import type { TechnologyDefinition } from '../../types';

export const promobuildingTechnologyDefinition = {
	id: "promobuilding",
	name: "PromoBuilding",
	website: "https://promobuilding.ru",
	description: "PromoBuilding is a subscription-based website builder for optimising budgets for creating promotional campaigns.",
	icon: "PromoBuilding.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "promobuilding:html:0",
			kind: "html",
			pattern: new RegExp("<!-- made with https:\\/\\/promobuilding\\.ru"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "promobuilding:jsGlobal:1",
			kind: "jsGlobal",
			property: "promoApi",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "promobuilding:jsGlobal:2",
			kind: "jsGlobal",
			property: "promoDomain",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "promobuilding:jsGlobal:3",
			kind: "jsGlobal",
			property: "promoIsOver",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "promobuilding:jsGlobal:4",
			kind: "jsGlobal",
			property: "promoStart",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "promobuilding:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^promobuilding_session$", "i"),
			description: "Cookie name matches a known technology marker.",
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
