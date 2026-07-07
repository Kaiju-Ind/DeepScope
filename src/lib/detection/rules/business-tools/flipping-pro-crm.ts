import type { TechnologyDefinition } from '../../types';

export const flippingProCrmTechnologyDefinition = {
	id: "flipping-pro-crm",
	name: "Flipping Pro CRM",
	website: "https://flippingpro.com",
	description: "Flipping Pro is an all-in-one real estate marketing CRM offering essential tools to help real estate business owners grow their operations.",
	icon: "FlippingPro.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "flipping-pro-crm:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.flippingpro\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
