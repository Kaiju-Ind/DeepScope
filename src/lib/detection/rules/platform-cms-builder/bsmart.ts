import type { TechnologyDefinition } from '../../types';

export const bsmartTechnologyDefinition = {
	id: "bsmart",
	name: "BSmart",
	website: "https://www.bsmart.co.il/",
	description: "BSmart is an ecommerce platform, programmed by Microline.",
	icon: "BSmart.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bsmart:jsGlobal:0",
			kind: "jsGlobal",
			property: "BSmartConfirmWindow",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bsmart:jsGlobal:1",
			kind: "jsGlobal",
			property: "bsGetBSmartStock",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bsmart:jsGlobal:2",
			kind: "jsGlobal",
			property: "bsmartPriceList",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bsmart:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^bsmartstate$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
