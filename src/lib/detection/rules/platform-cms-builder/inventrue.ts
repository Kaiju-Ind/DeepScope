import type { TechnologyDefinition } from '../../types';

export const inventrueTechnologyDefinition = {
	id: "inventrue",
	name: "Inventrue",
	website: "https://www.inventrue.com",
	description: "Inventrue creates websites for RV, Motorsports and Trailer Dealerships.",
	icon: "Inventrue.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "inventrue:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Inventrue, LLC.$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "inventrue:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^inventrue, llc.$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
