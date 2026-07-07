import type { TechnologyDefinition } from '../../types';

export const eticexTechnologyDefinition = {
	id: "eticex",
	name: "Eticex",
	website: "https://www.eticex.com",
	description: "Eticex is as an ecommerce infrastructure provider that offers ecommerce packages and customisable high-performance ecommerce solutions.",
	icon: "Eticex.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "eticex:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.eticex\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "eticex:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.eticex\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	implies: [
		"mysql",
		"php",
		"react",
	],
} as const satisfies TechnologyDefinition;
