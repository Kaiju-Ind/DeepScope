import type { TechnologyDefinition } from '../../types';

export const unbounceTechnologyDefinition = {
	id: "unbounce",
	name: "Unbounce",
	website: "https://unbounce.com",
	description: "Unbounce is a tool to build landing pages.",
	icon: "Unbounce.png",
	categories: [
		"rich-text-editors",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "unbounce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ubembed\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
