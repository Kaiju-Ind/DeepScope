import type { TechnologyDefinition } from '../../types';

export const klevuTechnologyDefinition = {
	id: "klevu",
	name: "Klevu",
	website: "https://www.klevu.com",
	description: "Klevu is a highly advanced AI-Powered search solution for ecommerce platforms.",
	icon: "Klevu.png",
	categories: [
		"search",
	],
	rules: [
		{
			id: "klevu:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.klevu\\.\\w+\\/klevu-js-v([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "klevu:jsGlobal:1",
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
			id: "klevu:jsGlobal:2",
			kind: "jsGlobal",
			property: "klevu_apiKey",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "klevu:jsGlobal:3",
			kind: "jsGlobal",
			property: "klevu_layout",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "klevu:jsGlobal:4",
			kind: "jsGlobal",
			property: "klevu_sessionId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "klevu:jsGlobal:5",
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
