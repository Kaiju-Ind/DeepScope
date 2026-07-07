import type { TechnologyDefinition } from '../../types';

export const glooTechnologyDefinition = {
	id: "gloo",
	name: "Gloo",
	website: "https://www.gloo.us",
	description: "Gloo is a platform designed to help churches develop a more connected ministry.",
	icon: "Gloo.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "gloo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.gloo\\.us\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gloo:jsGlobal:1",
			kind: "jsGlobal",
			property: "__GLOO_ONLINE",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
