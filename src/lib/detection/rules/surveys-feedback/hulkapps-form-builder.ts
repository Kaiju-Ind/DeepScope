import type { TechnologyDefinition } from '../../types';

export const hulkappsFormBuilderTechnologyDefinition = {
	id: "hulkapps-form-builder",
	name: "HulkApps Form Builder",
	website: "https://www.hulkapps.com/products/form-builder-shopify",
	description: "HulkApps Form Builder is an application that creates customizable, job-specific forms for unit needs.",
	icon: "HulkApps.svg",
	categories: [
		"surveys-feedback",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "hulkapps-form-builder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("formbuilder\\.hulkapps\\.com\\/"),
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
