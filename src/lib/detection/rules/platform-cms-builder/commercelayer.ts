import type { TechnologyDefinition } from '../../types';

export const commercelayerTechnologyDefinition = {
	id: "commercelayer",
	name: "Commercelayer",
	website: "https://commercelayer.io",
	description: "Commercelayer is a headless ecommerce platform that permits businesses to create customisable and scalable online shopping experiences via an API-first architecture that allows developers to use any programming language or framework for building ecommerce sites and applications.",
	icon: "commercelayer.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "commercelayer:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("\\.commercelayer\\.io"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "commercelayer:jsGlobal:1",
			kind: "jsGlobal",
			property: "commerceLayer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "commercelayer:jsGlobal:2",
			kind: "jsGlobal",
			property: "commerceLayerCache",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "commercelayer:jsGlobal:3",
			kind: "jsGlobal",
			property: "commercelayerConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
