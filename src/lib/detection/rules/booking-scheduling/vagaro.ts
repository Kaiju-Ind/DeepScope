import type { TechnologyDefinition } from '../../types';

export const vagaroTechnologyDefinition = {
	id: "vagaro",
	name: "Vagaro",
	website: "https://www.vagaro.com/pro/schedulicity",
	description: "Vagaro is a software platform that enables businesses to manage and book appointments online through a centralized scheduling system.",
	icon: "Vagaro.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "vagaro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.schedulicity\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
