import type { TechnologyDefinition } from '../../types';

export const lpqvTechnologyDefinition = {
	id: "lpqv",
	name: "LPQV",
	website: "https://www.lpqv.com.br/",
	description: "LPQV is an online store that offers integrated landing pages, streamlining the entire operation in one place.",
	icon: "LPQV.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "lpqv:jsGlobal:0",
			kind: "jsGlobal",
			property: "LPQV.page",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lpqv:jsGlobal:1",
			kind: "jsGlobal",
			property: "LPQV_VARS_RPL",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
