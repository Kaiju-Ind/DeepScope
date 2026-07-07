import type { TechnologyDefinition } from '../../types';

export const mappedinTechnologyDefinition = {
	id: "mappedin",
	name: "Mappedin",
	website: "https://www.mappedin.com",
	description: "Mappedin is an all-in-one indoor mapping platform designed for scalability.",
	icon: "Mappedin.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "mappedin:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.mappedin\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mappedin:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.mappedin\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
