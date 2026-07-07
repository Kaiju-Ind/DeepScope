import type { TechnologyDefinition } from '../../types';

export const humcommerceTechnologyDefinition = {
	id: "humcommerce",
	name: "HumCommerce",
	website: "https://www.humcommerce.com",
	description: "HumCommerce is a platform providing ecommerce solutions tailored for B2B and B2C brands, focusing on enhancing online sales and customer engagement.",
	icon: "HumCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "humcommerce:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.humcommerce\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
