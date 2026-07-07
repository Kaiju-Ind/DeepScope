import type { TechnologyDefinition } from '../../types';

export const certishoppingTechnologyDefinition = {
	id: "certishopping",
	name: "Certishopping",
	website: "https://www.certishopping.com",
	description: "Certishopping is an all-in-one marketing platform designed to accelerate business growth through integrated tools and automation.",
	icon: "Certishopping.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "certishopping:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.certishopping\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "certishopping:header:1",
			kind: "header",
			key: "Access-Control-Allow-Origin",
			valuePattern: new RegExp("business\\.certishopping\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "certishopping:header:2",
			kind: "header",
			key: "access-control-allow-origin",
			valuePattern: new RegExp("business\\.certishopping\\.com", "i"),
			description: "Response header matches a known technology marker.",
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
