import type { TechnologyDefinition } from '../../types';

export const unpkgTechnologyDefinition = {
	id: "unpkg",
	name: "Unpkg",
	website: "https://unpkg.com",
	description: "Unpkg is a content delivery network for everything on npm.",
	icon: "Unpkg.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "unpkg:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("unpkg\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "unpkg:dom:1",
			kind: "dom",
			selector: "link[href*='unpkg.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
