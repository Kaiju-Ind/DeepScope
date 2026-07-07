import type { TechnologyDefinition } from '../../types';

export const congressusTechnologyDefinition = {
	id: "congressus",
	name: "Congressus",
	website: "https://congressus.nl",
	description: "Congressus is a Dutch-language online application for member administration, financial management, communication and a linked website with webshop.",
	icon: "Congressus.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "congressus:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^_gat_congressus_analytics$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "congressus:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^congressus_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "congressus:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Congressus\\s-\\s.+$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "congressus:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^congressus\\s-\\s.+$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
