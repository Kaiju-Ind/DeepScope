import type { TechnologyDefinition } from '../../types';

export const pagemakerTechnologyDefinition = {
	id: "pagemaker",
	name: "Pagemaker",
	website: "https://pagemaker.io",
	description: "Pagemaker is a tool for creating mobile-first web pages optimized for high conversion rates.",
	icon: "Pagemaker.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pagemaker:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.pagemaker\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pagemaker:jsGlobal:1",
			kind: "jsGlobal",
			property: "pagemaker.accordion",
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
