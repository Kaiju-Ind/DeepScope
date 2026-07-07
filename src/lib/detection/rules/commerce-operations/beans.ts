import type { TechnologyDefinition } from '../../types';

export const beansTechnologyDefinition = {
	id: "beans",
	name: "Beans",
	website: "https://www.trybeans.com/",
	description: "Beans is a provider of ecommerce loyalty programs.",
	icon: "Beans.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "beans:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.trybeans\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "beans:jsGlobal:1",
			kind: "jsGlobal",
			property: "Beans3",
			description: "Page-owned global matches a known technology marker.",
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
