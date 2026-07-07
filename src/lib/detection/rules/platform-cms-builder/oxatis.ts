import type { TechnologyDefinition } from '../../types';

export const oxatisTechnologyDefinition = {
	id: "oxatis",
	name: "Oxatis",
	website: "https://www.oxatis.com/",
	description: "Oxatis is a cloud-based ecommerce solution which enables users to create and manage their own online store websites.",
	icon: "Oxatis.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "oxatis:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Oxatis\\s\\(www\\.oxatis\\.com\\)$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "oxatis:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^oxatis\\s\\(www\\.oxatis\\.com\\)$", "i"),
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
