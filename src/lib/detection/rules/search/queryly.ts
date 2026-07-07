import type { TechnologyDefinition } from '../../types';

export const querylyTechnologyDefinition = {
	id: "queryly",
	name: "Queryly",
	website: "https://queryly.com/",
	description: "Queryly is a cloud-based API providing site search and content recommendation functionalities, utilizing advanced algorithms to deliver quick, relevant search results and personalized content suggestions.",
	icon: "Queryly.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "queryly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.queryly\\.com\\/js\\/queryly\\.v([\\d\\.]+)\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "queryly:jsGlobal:1",
			kind: "jsGlobal",
			property: "queryly",
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
