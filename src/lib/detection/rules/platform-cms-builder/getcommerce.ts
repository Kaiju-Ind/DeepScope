import type { TechnologyDefinition } from '../../types';

export const getcommerceTechnologyDefinition = {
	id: "getcommerce",
	name: "GetCommerce",
	website: "https://getcommerce.xyz",
	description: "GetCommerce is a platform providing ecommerce website design and development tailored to align with brand identity and functionality.",
	icon: "GetCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "getcommerce:jsGlobal:0",
			kind: "jsGlobal",
			property: "getCommerce.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "getcommerce:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("getCommerce ([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "getcommerce:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("getcommerce ([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
