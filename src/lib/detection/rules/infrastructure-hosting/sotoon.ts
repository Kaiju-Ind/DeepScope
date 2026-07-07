import type { TechnologyDefinition } from '../../types';

export const sotoonTechnologyDefinition = {
	id: "sotoon",
	name: "Sotoon",
	website: "https://sotoon.ir",
	description: "Sotoon is a CDN provider serving users specially in the MENA region.",
	icon: "Sotoon.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "sotoon:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^Sotoon$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "sotoon:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^Sotoon(?: CDN)?$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "sotoon:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^sotoon$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
