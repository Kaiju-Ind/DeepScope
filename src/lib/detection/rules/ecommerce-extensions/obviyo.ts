import type { TechnologyDefinition } from '../../types';

export const obviyoTechnologyDefinition = {
	id: "obviyo",
	name: "Obviyo",
	website: "https://www.obviyo.com",
	description: "Obviyo is an ecommerce intelligence platform helping merchants personalise and optimise shopping experience.",
	icon: "Obviyo.png",
	categories: [
		"ecommerce-extensions",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "obviyo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("deploy\\.hiconversion\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "obviyo:jsGlobal:1",
			kind: "jsGlobal",
			property: "__hic.version",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
