import type { TechnologyDefinition } from '../../types';

export const maglrTechnologyDefinition = {
	id: "maglr",
	name: "Maglr",
	website: "https://www.maglr.com",
	description: "Maglr is a no-code design platform for creating interactive visual stories.",
	icon: "Maglr.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "maglr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("system\\.maglr\\.com\\/[^?]+\\?v=([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "maglr:jsGlobal:1",
			kind: "jsGlobal",
			property: "maglr_pirsch",
			description: "Page-owned global matches a known technology marker.",
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
