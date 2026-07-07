import type { TechnologyDefinition } from '../../types';

export const orckestraTechnologyDefinition = {
	id: "orckestra",
	name: "Orckestra",
	website: "https://www.orckestra.com",
	description: "Orckestra is a provider of cloud-based digital unified and omnichannel commerce solutions for retail and manufacturing industries.",
	icon: "Orckestra.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "orckestra:header:0",
			kind: "header",
			key: "x-orckestra-commerce",
			valuePattern: new RegExp(".NET Client", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "orckestra:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("Orckestra", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "orckestra:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^C1 CMS Foundation - Free Open Source from Orckestra and https:\\/\\/github.com\\/Orckestra\\/C1-CMS-Foundation$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "orckestra:header:3",
			kind: "header",
			key: "x-orckestra-commerce",
			valuePattern: new RegExp(".net client", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "orckestra:header:4",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("orckestra", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "orckestra:meta:5",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^c1 cms foundation - free open source from orckestra and https:\\/\\/github.com\\/orckestra\\/c1-cms-foundation$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
