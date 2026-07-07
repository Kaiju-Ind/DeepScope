import type { TechnologyDefinition } from '../../types';

export const freshoTechnologyDefinition = {
	id: "fresho",
	name: "Fresho",
	website: "https://www.fresho.com",
	description: "Fresho is an Order Management System that streamlines the processing, tracking, and fulfillment of customer orders across various sales channels.",
	icon: "Fresho.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "fresho:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.fresho\\.com"),
			description: "Script content contains a bounded technology signature.",
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
