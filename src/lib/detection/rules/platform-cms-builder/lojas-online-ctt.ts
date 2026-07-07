import type { TechnologyDefinition } from '../../types';

export const lojasOnlineCttTechnologyDefinition = {
	id: "lojas-online-ctt",
	name: "Lojas Online CTT",
	website: "https://www.ctt.pt/empresas/e-commerce-e-logistica/e-commerce/lojas-online-ctt/index",
	description: "Lojas Online CTT is an ecommerce website builder that provides an online storefront with deliveries insured by CTT.",
	icon: "LojasOnlineCTT.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "lojas-online-ctt:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.lojasonlinectt\\.pt"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lojas-online-ctt:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("Lojas Online CTT", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "lojas-online-ctt:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("lojas online ctt", "i"),
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
