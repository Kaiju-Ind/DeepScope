import type { TechnologyDefinition } from '../../types';

export const littledataTechnologyDefinition = {
	id: "littledata",
	name: "Littledata",
	website: "https://www.littledata.io",
	description: "Littledata provides a seamless connection between your Shopify site, marketing channels, and Google Analytics.",
	icon: "Littledata.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "littledata:jsGlobal:0",
			kind: "jsGlobal",
			property: "LittledataLayer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "littledata:jsGlobal:1",
			kind: "jsGlobal",
			property: "LittledataLayer.version",
			valuePattern: new RegExp("v([\\d\\.]+)"),
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
			"mid",
			"recurring",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
