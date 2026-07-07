import type { TechnologyDefinition } from '../../types';

export const powerfulFormTechnologyDefinition = {
	id: "powerful-form",
	name: "Powerful Form",
	website: "https://powerfulform.com",
	description: "Powerful Form is a tool that enables custom form creation for Shopify stores, allowing collection and management of customer information directly within the storefront.",
	icon: "PowerfulForm.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "powerful-form:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.powerfulform\\.com"),
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
