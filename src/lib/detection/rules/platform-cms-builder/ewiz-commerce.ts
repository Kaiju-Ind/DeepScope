import type { TechnologyDefinition } from '../../types';

export const ewizCommerceTechnologyDefinition = {
	id: "ewiz-commerce",
	name: "ewiz commerce",
	website: "https://www.ewizcommerce.com",
	description: "ewiz commerce is a B2B solution that integrates advanced eCommerce technology and AI to help manufacturers, distributors, and wholesalers streamline operations and improve ROI.",
	icon: "ewizcommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ewiz-commerce:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.ewizsaas\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
