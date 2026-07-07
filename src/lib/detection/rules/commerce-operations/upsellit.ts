import type { TechnologyDefinition } from '../../types';

export const upsellitTechnologyDefinition = {
	id: "upsellit",
	name: "UpSellit",
	website: "https://us.upsellit.com",
	description: "UpSellit is a performance based lead and cart abandonment recovery solutions.",
	icon: "UpSellit.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "upsellit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.upsellit\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "upsellit:jsGlobal:1",
			kind: "jsGlobal",
			property: "usi_analytics",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "upsellit:jsGlobal:2",
			kind: "jsGlobal",
			property: "usi_app",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "upsellit:jsGlobal:3",
			kind: "jsGlobal",
			property: "usi_commons",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "upsellit:jsGlobal:4",
			kind: "jsGlobal",
			property: "usi_cookies",
			confidence: 25,
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
