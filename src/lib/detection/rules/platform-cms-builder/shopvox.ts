import type { TechnologyDefinition } from '../../types';

export const shopvoxTechnologyDefinition = {
	id: "shopvox",
	name: "ShopVOX",
	website: "https://shopvox.com",
	description: "ShopVOX is a web-based platform for custom fabricators.",
	icon: "ShopVOX.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopvox:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.shopvox\\.com\\/"),
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
