import type { TechnologyDefinition } from '../../types';

export const gelatoTechnologyDefinition = {
	id: "gelato",
	name: "Gelato",
	website: "https://www.gelato.com",
	description: "Gelato is a print-on-demand service designed for ecommerce businesses, offering customizable printing solutions without the need for inventory management.",
	icon: "Gelato.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "gelato:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.live\\.gelato\\.tech"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gelato:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.live\\.gelato\\.tech"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
