import type { TechnologyDefinition } from '../../types';

export const malomoTechnologyDefinition = {
	id: "malomo",
	name: "Malomo",
	website: "https://gomalomo.com",
	description: "Malomo is a cloud-based shipment tracking solution that helps small to midsize eCommerce businesses provide customers with shipping updates via white-label package tracking pages.",
	icon: "Malomo.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "malomo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.gomalomo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "malomo:jsGlobal:1",
			kind: "jsGlobal",
			property: "Malomo",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
