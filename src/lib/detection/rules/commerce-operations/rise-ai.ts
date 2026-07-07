import type { TechnologyDefinition } from '../../types';

export const riseAiTechnologyDefinition = {
	id: "rise-ai",
	name: "Rise.ai",
	website: "https://rise.ai",
	description: "Rise.ai is a strategic re-engagement solution that provides brands and retailers with a unique currency of their own.",
	icon: "Rise.ai.svg",
	categories: [
		"commerce-operations",
		"marketing-automation",
	],
	rules: [
		{
			id: "rise-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("strn\\.rise-ai\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rise-ai:jsGlobal:1",
			kind: "jsGlobal",
			property: "Rise.shop",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "rise-ai:jsGlobal:2",
			kind: "jsGlobal",
			property: "RiseStoreFront",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
