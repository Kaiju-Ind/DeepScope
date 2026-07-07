import type { TechnologyDefinition } from '../../types';

export const ochanokoTechnologyDefinition = {
	id: "ochanoko",
	name: "Ochanoko",
	website: "https://www.ocnk.com",
	description: "Ochanoko is an ecommerce online shopping cart solutions, ecommerce web site hosting.",
	icon: "Ochanoko.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ochanoko:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ocnk-min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ochanoko:jsGlobal:1",
			kind: "jsGlobal",
			property: "ocnkProducts",
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
