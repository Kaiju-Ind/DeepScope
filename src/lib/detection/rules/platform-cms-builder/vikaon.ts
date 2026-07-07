import type { TechnologyDefinition } from '../../types';

export const vikaonTechnologyDefinition = {
	id: "vikaon",
	name: "VikaOn",
	website: "https://vikaon.com",
	description: "VikaOn is a Turkish ecommerce platform that enables businesses and consumers to buy and sell products online through a centralized digital marketplace.",
	icon: "VikaOn.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vikaon:jsGlobal:0",
			kind: "jsGlobal",
			property: "_vikaLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vikaon:jsGlobal:1",
			kind: "jsGlobal",
			property: "_vikaLoadedRender",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vikaon:header:2",
			kind: "header",
			key: "X-Vikaon-Version",
			valuePattern: new RegExp("(.+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "vikaon:header:3",
			kind: "header",
			key: "x-vikaon-version",
			valuePattern: new RegExp("(.+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
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
