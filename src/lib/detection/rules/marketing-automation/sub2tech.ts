import type { TechnologyDefinition } from '../../types';

export const sub2techTechnologyDefinition = {
	id: "sub2tech",
	name: "Sub2Tech",
	website: "https://www.sub2tech.com",
	description: "Sub2Tech is combining real time customer data with industry-leading technology.",
	icon: "Sub2Tech.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "sub2tech:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.sub2tech\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sub2tech:jsGlobal:1",
			kind: "jsGlobal",
			property: "SUB2.codebaseversion",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
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
