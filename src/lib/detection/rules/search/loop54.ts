import type { TechnologyDefinition } from '../../types';

export const loop54TechnologyDefinition = {
	id: "loop54",
	name: "Loop54",
	website: "https://www.loop54.com",
	description: "Loop54 is an ecommerce search and navigation SaaS product.",
	icon: "Loop54.png",
	categories: [
		"search",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "loop54:jsGlobal:0",
			kind: "jsGlobal",
			property: "Loop54.config.libVersion",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "loop54:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^Loop54User$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "loop54:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^loop54user$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
