import type { TechnologyDefinition } from '../../types';

export const unbxdTechnologyDefinition = {
	id: "unbxd",
	name: "Unbxd",
	website: "https://unbxd.com",
	description: "Unbxd is an ecommerce product discovery platform that applies artificial intelligence and advanced data sciences to connect shoppers to the products they are most likely to buy.",
	icon: "Unbxd.svg",
	categories: [
		"experimentation-optimization",
		"search",
	],
	rules: [
		{
			id: "unbxd:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cloudfront\\.net\\/unbxdAnalytics\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "unbxd:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("unbxd\\.s\\d\\.amazonaws\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "unbxd:jsGlobal:2",
			kind: "jsGlobal",
			property: "Unbxd.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "unbxd:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cloudfront\\.net\\/unbxdanalytics\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
