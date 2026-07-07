import type { TechnologyDefinition } from '../../types';

export const zeemapsTechnologyDefinition = {
	id: "zeemaps",
	name: "ZeeMaps",
	website: "https://www.zeemaps.com",
	description: "ZeeMaps is a custom map generation service that enables users to create personalized maps with location markers, regions, and annotations.",
	icon: "ZeeMaps.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "zeemaps:dom:0",
			kind: "dom",
			selector: "iframe[src*='www.zeemaps.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "zeemaps:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackChunkZeeMaps",
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
