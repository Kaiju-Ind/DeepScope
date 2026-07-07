import type { TechnologyDefinition } from '../../types';

export const dckapCommerceTechnologyDefinition = {
	id: "dckap-commerce",
	name: "DCKAP Commerce",
	website: "https://www.dckap.com/commerce",
	description: "DCKAP Commerce is a B2B ecommerce platform for distributors and manufacturers.",
	icon: "DCKAPCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "dckap-commerce:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("assets\\.mydckapcommerce\\.com"),
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
