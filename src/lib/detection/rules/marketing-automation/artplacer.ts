import type { TechnologyDefinition } from '../../types';

export const artplacerTechnologyDefinition = {
	id: "artplacer",
	name: "ArtPlacer",
	website: "https://www.artplacer.com",
	description: "ArtPlacer is a marketing tool designed to support growth in art businesses by enhancing visibility and promotional efforts.",
	icon: "Artplacer.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "artplacer:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("shop-app\\.artplacer\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "artplacer:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^artplacer_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
