import type { TechnologyDefinition } from '../../types';

export const triboxEcommerceTechnologyDefinition = {
	id: "tribox-ecommerce",
	name: "Tribox Ecommerce",
	website: "https://tribox.com.br/",
	description: "Tribox Ecommerce is a service provider offering website and online store creation to support businesses in increasing online sales.",
	icon: "Tribox.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tribox-ecommerce:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Tribox", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "tribox-ecommerce:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Tribox E-commerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "tribox-ecommerce:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^tribox", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "tribox-ecommerce:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^tribox e-commerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
