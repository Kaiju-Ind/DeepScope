import type { TechnologyDefinition } from '../../types';

export const peachieTechnologyDefinition = {
	id: "peachie",
	name: "Peachie",
	website: "https://peachie.io",
	description: "Peachie is an all-in-one CMS for creating and selling online courses while managing website content and related digital operations.",
	icon: "Peachie.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "peachie:dom:0",
			kind: "dom",
			selector: "iframe[src*='.mypeachie.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "peachie:header:1",
			kind: "header",
			key: "Access-Control-Allow-Origin",
			valuePattern: new RegExp("go\\.mypeachie\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "peachie:header:2",
			kind: "header",
			key: "access-control-allow-origin",
			valuePattern: new RegExp("go\\.mypeachie\\.com", "i"),
			description: "Response header matches a known technology marker.",
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
