import type { TechnologyDefinition } from '../../types';

export const merchelloTechnologyDefinition = {
	id: "merchello",
	name: "Merchello",
	website: "https://merchello.readme.io/docs/overview",
	description: "Merchello is an open source ecommerce package for the Umbraco CMS.",
	icon: "Merchello.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "merchello:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^merchello$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
	},
} as const satisfies TechnologyDefinition;
