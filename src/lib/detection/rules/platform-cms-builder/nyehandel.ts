import type { TechnologyDefinition } from '../../types';

export const nyehandelTechnologyDefinition = {
	id: "nyehandel",
	name: "Nyehandel",
	website: "https://nyehandel.se",
	description: "Nyehandel is an ecommerce platform that manages the entire process from purchase to delivery, designed to enhance operational efficiency and market competitiveness.",
	icon: "Nyehandel.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "nyehandel:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^nyehandelse_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
	requires: [
		"caddy",
	],
} as const satisfies TechnologyDefinition;
