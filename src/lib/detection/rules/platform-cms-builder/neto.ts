import type { TechnologyDefinition } from '../../types';

export const netoTechnologyDefinition = {
	id: "neto",
	name: "Neto",
	website: "https://www.neto.com.au",
	description: "Neto is the only Australian B2B and multi-channel ecommerce platform that provides an all-in-one solution for ecommerce, POS, inventory management, order management, and shipping labelling.",
	icon: "Neto.svg",
	categories: [
		"platform-cms-builder",
		"commerce-operations",
	],
	rules: [
		{
			id: "neto:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jquery\\.neto.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "neto:jsGlobal:1",
			kind: "jsGlobal",
			property: "NETO",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
