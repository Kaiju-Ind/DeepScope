import type { TechnologyDefinition } from '../../types';

export const dynamicYieldTechnologyDefinition = {
	id: "dynamic-yield",
	name: "Dynamic Yield",
	website: "https://www.dynamicyield.com",
	description: "Dynamic Yield is a provider of automated conversion optimisation tools for marketers and retailers.",
	icon: "DynamicYield.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "dynamic-yield:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn(?:-eu)?\\.dynamicyield\\.\\w+\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dynamic-yield:jsGlobal:1",
			kind: "jsGlobal",
			property: "DY.AdDetection",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dynamic-yield:jsGlobal:2",
			kind: "jsGlobal",
			property: "DYExps.sectionConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dynamic-yield:jsGlobal:3",
			kind: "jsGlobal",
			property: "_dy_memStore",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dynamic-yield:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^_dy_geo$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "dynamic-yield:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^_dy_ses_load_seq$", "i"),
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
