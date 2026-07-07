import type { TechnologyDefinition } from '../../types';

export const grinTechnologyDefinition = {
	id: "grin",
	name: "Grin",
	website: "https://grin.co/",
	description: "Grin is an influence marketing platform.",
	icon: "Grin.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "grin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("grin-sdk\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "grin:jsGlobal:1",
			kind: "jsGlobal",
			property: "Grin",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		cpe: "cpe:2.3:a:grin:grin:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
