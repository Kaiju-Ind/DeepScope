import type { TechnologyDefinition } from '../../types';

export const outfindoTechnologyDefinition = {
	id: "outfindo",
	name: "Outfindo",
	website: "https://www.outfindo.com",
	description: "Outfindo is a platform that provides product selection guides for websites to improve customer shopping experiences and boost conversions.",
	icon: "Outfindo.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "outfindo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.outfindo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "outfindo:jsGlobal:1",
			kind: "jsGlobal",
			property: "outfindoCatalogGuideData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "outfindo:jsGlobal:2",
			kind: "jsGlobal",
			property: "outfindoCatalogGuideMapFailed",
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
