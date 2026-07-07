import type { TechnologyDefinition } from '../../types';

export const pricespiderTechnologyDefinition = {
	id: "pricespider",
	name: "PriceSpider",
	website: "https://www.pricespider.com",
	description: "PriceSpider is an advanced retail data technology company that provides insights about consumer purchasing behavior.",
	icon: "PriceSpider.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "pricespider:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.pricespider\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pricespider:jsGlobal:1",
			kind: "jsGlobal",
			property: "PriceSpider.version",
			valuePattern: new RegExp("(.+)"),
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
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
