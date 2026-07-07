import type { TechnologyDefinition } from '../../types';

export const blueTriangleTechnologyDefinition = {
	id: "blue-triangle",
	name: "Blue Triangle",
	website: "https://bluetriangle.com",
	description: "Blue Triangle is a connected view of marketing, web performance, and third-party tag analytics while constantly monitoring website code for security vulnerabilities.",
	icon: "Blue Triangle.png",
	categories: [
		"security",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "blue-triangle:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.btttag\\.com\\/btt\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "blue-triangle:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("\\.btttag\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "blue-triangle:jsGlobal:2",
			kind: "jsGlobal",
			property: "_bttUtil.version",
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
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
