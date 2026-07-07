import type { TechnologyDefinition } from '../../types';

export const hyperlaneTechnologyDefinition = {
	id: "hyperlane",
	name: "Hyperlane",
	website: "https://hyperlane.co",
	description: "Hyperlane is a hosting platform for WordPress and Craft CMS websites.",
	icon: "Hyperlane.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "hyperlane:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.hyperlane\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hyperlane:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.hyperlane\\.co\\/"),
			description: "Script content contains a bounded technology signature.",
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
