import type { TechnologyDefinition } from '../../types';

export const zidTechnologyDefinition = {
	id: "zid",
	name: "Zid",
	website: "https://zid.sa",
	description: "Zid is an ecommerce SaaS that allows merchants to build and manage their online stores.",
	icon: "Zid.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zid:jsGlobal:0",
			kind: "jsGlobal",
			property: "zid.store",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zid:jsGlobal:1",
			kind: "jsGlobal",
			property: "zidTracking.sendGaProductRemoveFromCartEvent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zid:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^zid_catalog_session$", "i"),
			description: "Cookie name matches a known technology marker.",
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
