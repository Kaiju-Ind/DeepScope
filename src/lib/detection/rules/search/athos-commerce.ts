import type { TechnologyDefinition } from '../../types';

export const athosCommerceTechnologyDefinition = {
	id: "athos-commerce",
	name: "Athos Commerce",
	website: "https://athoscommerce.com/",
	description: "Athos Commerce is a site search and merchandising platform designed to help ecommerce.",
	icon: "Athos Commerce.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "athos-commerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.searchspring\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "athos-commerce:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.klevu\\.\\w+\\/klevu-js-v([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "athos-commerce:jsGlobal:2",
			kind: "jsGlobal",
			property: "SearchSpring",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "athos-commerce:jsGlobal:3",
			kind: "jsGlobal",
			property: "SearchSpringConf",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "athos-commerce:jsGlobal:4",
			kind: "jsGlobal",
			property: "SearchSpringInit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "athos-commerce:jsGlobal:5",
			kind: "jsGlobal",
			property: "klevu.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "athos-commerce:jsGlobal:6",
			kind: "jsGlobal",
			property: "klevu_apiKey",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "athos-commerce:jsGlobal:7",
			kind: "jsGlobal",
			property: "klevu_layout",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "athos-commerce:jsGlobal:8",
			kind: "jsGlobal",
			property: "klevu_sessionId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "athos-commerce:jsGlobal:9",
			kind: "jsGlobal",
			property: "sendKlevuAnalytics",
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
} as const satisfies TechnologyDefinition;
