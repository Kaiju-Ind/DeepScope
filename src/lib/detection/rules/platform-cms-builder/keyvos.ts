import type { TechnologyDefinition } from '../../types';

export const keyvosTechnologyDefinition = {
	id: "keyvos",
	name: "Keyvos",
	website: "https://www.keyvos.gr",
	description: "Keyvos is a Greek ecommerce platform with functionality for storefront customization, product and order management, SEO, marketplace integration, and reporting.",
	icon: "Keyvos.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "keyvos:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Keyvos CMS", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "keyvos:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("keyvos cms", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"elasticsearch",
		"laravel",
		"mysql",
	],
} as const satisfies TechnologyDefinition;
