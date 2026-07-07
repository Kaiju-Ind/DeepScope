import type { TechnologyDefinition } from '../../types';

export const kindfulTechnologyDefinition = {
	id: "kindful",
	name: "Kindful",
	website: "https://kindful.com",
	description: "Kindful is a cloud-based donor management and fundraising software and database designed for nonprofit organisations.",
	icon: "Kindful.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "kindful:dom:0",
			kind: "dom",
			selector: "a[href*='.kindful.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kindful:jsGlobal:1",
			kind: "jsGlobal",
			property: "Bloomerang.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kindful:jsGlobal:2",
			kind: "jsGlobal",
			property: "KindfulPaymentsConnect",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kindful:jsGlobal:3",
			kind: "jsGlobal",
			property: "bloomerangLoadStarted",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kindful:jsGlobal:4",
			kind: "jsGlobal",
			property: "kindful_gtag",
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
