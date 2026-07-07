import type { TechnologyDefinition } from '../../types';

export const naverMapsTechnologyDefinition = {
	id: "naver-maps",
	name: "Naver Maps",
	website: "https://www.ncloud.com/product/applicationService/maps",
	description: "Naver Maps help develop location-based services which provided by Naver.",
	icon: "Naver Maps.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "naver-maps:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("openapi\\.map\\.naver\\.com\\/openapi\\/v([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "naver-maps:jsGlobal:1",
			kind: "jsGlobal",
			property: "naver.maps",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
