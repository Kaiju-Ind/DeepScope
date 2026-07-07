import type { TechnologyDefinition } from '../../types';

export const reproTechnologyDefinition = {
	id: "repro",
	name: "Repro",
	website: "https://repro.io",
	description: "Repro is a growth platform for mobile apps offering flexible analytics, user studies with play-by-play action videos, and marketing strategies like push notifications and in-app messages.",
	icon: "Repro.svg",
	categories: [
		"analytics",
		"marketing-automation",
	],
	rules: [
		{
			id: "repro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.reproio\\.com\\/web\\/v([\\d\\.]+)\\/repro-sdk\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "repro:jsGlobal:1",
			kind: "jsGlobal",
			property: "reproio",
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
