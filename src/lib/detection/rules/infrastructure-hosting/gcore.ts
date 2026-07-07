import type { TechnologyDefinition } from '../../types';

export const gcoreTechnologyDefinition = {
	id: "gcore",
	name: "Gcore",
	website: "https://gcore.com",
	description: "Gcore is a public cloud and content delivery network (CDN) company.",
	icon: "Gcore.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "gcore:header:0",
			kind: "header",
			key: "x-id",
			valuePattern: new RegExp("^[\\w-]+-gc\\d{2}$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "gcore:header:1",
			kind: "header",
			key: "x-id-fe",
			valuePattern: new RegExp("^[\\w-]+-gc\\d{2}$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
