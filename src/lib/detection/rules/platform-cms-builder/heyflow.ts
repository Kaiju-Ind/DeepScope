import type { TechnologyDefinition } from '../../types';

export const heyflowTechnologyDefinition = {
	id: "heyflow",
	name: "Heyflow",
	website: "https://heyflow.com",
	description: "Heyflow is an all-in-one platform that enables users to create interactive lead funnels, multi-step forms, and customized landing pages that drive conversions and engage website visitors, all without the need for coding.",
	icon: "Heyflow.svg",
	categories: [
		"platform-cms-builder",
		"surveys-feedback",
	],
	rules: [
		{
			id: "heyflow:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.heyflow\\.app\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "heyflow:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackChunk_heyflow_widget",
			description: "Page-owned global matches a known technology marker.",
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
} as const satisfies TechnologyDefinition;
