import type { TechnologyDefinition } from '../../types';

export const brinkCommerceTechnologyDefinition = {
	id: "brink-commerce",
	name: "Brink Commerce",
	website: "https://www.brinkcommerce.com",
	description: "Brink Commerce is a headless commerce API platform enabling businesses to manage and deliver ecommerce functionality through decoupled APIs.",
	icon: "BrinkCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "brink-commerce:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.brinkcommerce\\.com"),
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
