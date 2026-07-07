import type { TechnologyDefinition } from '../../types';

export const opentiendasTechnologyDefinition = {
	id: "opentiendas",
	name: "OpenTiendas",
	website: "https://www.opentiendas.com",
	description: "OpenTiendas is a hosted no-code All in One ecommerce technology that allows anyone to create online stores with advanced features without plugins.",
	icon: "OpenTiendas.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "opentiendas:dom:0",
			kind: "dom",
			selector: "link[href*='/opentiendasfont/font/opentiendasfont.woff2']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "opentiendas:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^OpenTiendas$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "opentiendas:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^opentiendas$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
