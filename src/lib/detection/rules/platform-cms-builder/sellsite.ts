import type { TechnologyDefinition } from '../../types';

export const sellsiteTechnologyDefinition = {
	id: "sellsite",
	name: "SellSite",
	website: "https://sellsite.net",
	description: "SellSite is a subscription-based software platform that enables users to create and manage online stores.",
	icon: "SellSite.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sellsite:jsGlobal:0",
			kind: "jsGlobal",
			property: "Sellsite",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sellsite:jsGlobal:1",
			kind: "jsGlobal",
			property: "Sellsite.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sellsite:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Sellsite$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "sellsite:meta:3",
			kind: "meta",
			key: "platform",
			valuePattern: new RegExp("Sellsite E-commerce", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "sellsite:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^sellsite$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "sellsite:meta:5",
			kind: "meta",
			key: "platform",
			valuePattern: new RegExp("sellsite e-commerce", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
