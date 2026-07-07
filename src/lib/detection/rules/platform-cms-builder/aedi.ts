import type { TechnologyDefinition } from '../../types';

export const aediTechnologyDefinition = {
	id: "aedi",
	name: "Aedi",
	website: "https://aedi.ai",
	description: "Aedi is a provider of AI solutions for ecommerce.",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "aedi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.aedi\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "aedi:jsGlobal:1",
			kind: "jsGlobal",
			property: "aediRcv",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
