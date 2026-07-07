import type { TechnologyDefinition } from '../../types';

export const amapTechnologyDefinition = {
	id: "amap",
	name: "Amap",
	website: "https://amap.com",
	description: "Amap is a digital cartography platform providing detailed geographic data, navigation, and location-based services across Asian regions.",
	icon: "Amap.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "amap:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("webapi\\.amap\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "amap:jsGlobal:1",
			kind: "jsGlobal",
			property: "AMap.ArrayBounds",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
