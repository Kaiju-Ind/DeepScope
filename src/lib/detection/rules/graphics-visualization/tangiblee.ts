import type { TechnologyDefinition } from '../../types';

export const tangibleeTechnologyDefinition = {
	id: "tangiblee",
	name: "Tangiblee",
	website: "https://www.tangiblee.com",
	description: "Tangiblee is an enterprise-ready, immersive shopping and augmented reality ecommerce platform.",
	icon: "Tangiblee.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "tangiblee:jsGlobal:0",
			kind: "jsGlobal",
			property: "globalTangiblee",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tangiblee:jsGlobal:1",
			kind: "jsGlobal",
			property: "tangiblee",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tangiblee:jsGlobal:2",
			kind: "jsGlobal",
			property: "tangibleeScriptLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
