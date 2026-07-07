import type { TechnologyDefinition } from '../../types';

export const adexTechnologyDefinition = {
	id: "adex",
	name: "Adex",
	website: "https://theadex.com",
	description: "Adex is a data management platform (DMP) system utilized for organizing and analyzing large volumes of data to optimize targeted advertising campaigns.",
	icon: "Adex.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "adex:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("dmp\\.theadex\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adex:dom:1",
			kind: "dom",
			selector: "link[href*='.theadex.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "adex:jsGlobal:2",
			kind: "jsGlobal",
			property: "_adexc",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adex:jsGlobal:3",
			kind: "jsGlobal",
			property: "adex.v",
			valuePattern: new RegExp("([\\d\\.]+)"),
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
