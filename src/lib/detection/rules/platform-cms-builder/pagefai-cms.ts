import type { TechnologyDefinition } from '../../types';

export const pagefaiCmsTechnologyDefinition = {
	id: "pagefai-cms",
	name: "Pagefai CMS",
	website: "https://www.pagefai.com",
	description: "Pagefai is a cloud-based platform that offers software-as-a-service solutions to businesses, including the Pagefai CMS which provides ecommerce functionality and other business tools.",
	icon: "Pagefai.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pagefai-cms:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("PAGEFAI CMS", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "pagefai-cms:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("pagefai cms", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
