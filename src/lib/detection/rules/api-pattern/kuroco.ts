import type { TechnologyDefinition } from '../../types';

export const kurocoTechnologyDefinition = {
	id: "kuroco",
	name: "Kuroco",
	website: "https://kuroco.app",
	description: "Kuroco is an API-centric platform that enables developers to create customizable APIs, manage content, and leverage a CDN for fast content delivery across various devices.",
	icon: "Kuroco.svg",
	categories: [
		"api-pattern",
		"developer-tooling",
	],
	rules: [
		{
			id: "kuroco:responseHeader:0",
			kind: "responseHeader",
			key: "x-kuroco-edge-log",
			description: "Response header matches a known technology marker.",
		},
		{
			id: "kuroco:responseHeader:1",
			kind: "responseHeader",
			key: "x-rcms-hash",
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: false,
		pricing: [
			"freemium",
			"mid",
			"recurring",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
