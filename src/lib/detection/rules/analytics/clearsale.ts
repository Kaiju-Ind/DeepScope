import type { TechnologyDefinition } from '../../types';

export const clearsaleTechnologyDefinition = {
	id: "clearsale",
	name: "ClearSale",
	website: "https://www.clear.sale/",
	description: "ClearSale offers fraud management and chargeback protection services.",
	icon: "ClearSale.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "clearsale:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("device\\.clearsale\\.com\\.br"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "clearsale:jsGlobal:1",
			kind: "jsGlobal",
			property: "csdm",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
