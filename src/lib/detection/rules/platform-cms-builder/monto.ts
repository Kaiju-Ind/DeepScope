import type { TechnologyDefinition } from '../../types';

export const montoTechnologyDefinition = {
	id: "monto",
	name: "Monto",
	website: "https://www.monto.io",
	description: "Monto is a platform for ecommerce apps in Webflow, designed to enhance business sales and optimise Webflow ecommerce sites.",
	icon: "Monto.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "monto:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.monto\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "monto:jsGlobal:1",
			kind: "jsGlobal",
			property: "MONTO",
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
	requires: [
		"webflow",
	],
} as const satisfies TechnologyDefinition;
