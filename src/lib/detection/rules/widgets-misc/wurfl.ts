import type { TechnologyDefinition } from '../../types';

export const wurflTechnologyDefinition = {
	id: "wurfl",
	name: "Wurfl",
	website: "https://web.wurfl.io/",
	description: "WURFL.js is JavaScript that detects device models of smartphones, tablets, smart TVs and game consoles accessing your website.",
	icon: "Wurfl.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "wurfl:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.wurfl\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wurfl:jsGlobal:1",
			kind: "jsGlobal",
			property: "WURFL",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
