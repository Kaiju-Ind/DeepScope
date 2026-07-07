import type { TechnologyDefinition } from '../../types';

export const brimbleTechnologyDefinition = {
	id: "brimble",
	name: "Brimble",
	website: "https://brimble.io",
	description: "Brimble is a cloud platform for deploying frontend web applications.",
	icon: "brimble.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "brimble:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^Brimble$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "brimble:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^brimble$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
