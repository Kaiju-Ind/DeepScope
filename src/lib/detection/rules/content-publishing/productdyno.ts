import type { TechnologyDefinition } from '../../types';

export const productdynoTechnologyDefinition = {
	id: "productdyno",
	name: "ProductDyno",
	website: "https://productdyno.com",
	description: "ProductDyno is a digital platform designed to help users manage, protect, and deliver digital products while enhancing online presence.",
	icon: "ProductDyno.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "productdyno:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.productdyno\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "productdyno:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^productdyno_session$", "i"),
			description: "Cookie name matches a known technology marker.",
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
