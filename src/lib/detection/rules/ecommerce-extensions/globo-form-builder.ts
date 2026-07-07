import type { TechnologyDefinition } from '../../types';

export const globoFormBuilderTechnologyDefinition = {
	id: "globo-form-builder",
	name: "Globo Form Builder",
	website: "https://apps.shopify.com/form-builder-contact-form",
	description: "Form Builder is a Shopify form builder app for contact form built by Globo.",
	icon: "Globo apps.png",
	categories: [
		"ecommerce-extensions",
		"surveys-feedback",
	],
	rules: [
		{
			id: "globo-form-builder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/assets\\/globo\\.formbuilder\\.init\\.js"),
			description: "Script source URL matches a known technology marker.",
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
