import type { TechnologyDefinition } from '../../types';

export const storepointTechnologyDefinition = {
	id: "storepoint",
	name: "StorePoint",
	website: "https://storepoint.co",
	description: "StorePoint is a store locator software that allows anyone to build a store locator for their website and fully customize it to match the website theme, branding, colors, exact fonts and much more.",
	icon: "StorePoint.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "storepoint:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.storepoint\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "storepoint:jsGlobal:1",
			kind: "jsGlobal",
			property: "STOREPOINT",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
