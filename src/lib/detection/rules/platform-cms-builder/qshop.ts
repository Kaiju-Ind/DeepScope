import type { TechnologyDefinition } from '../../types';

export const qshopTechnologyDefinition = {
	id: "qshop",
	name: "Qshop",
	website: "https://qshop.ai",
	description: "Qshop is a Korean ecommerce platform that enables the creation of online stores.",
	icon: "Qshop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "qshop:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.qshop\\.ai"),
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
} as const satisfies TechnologyDefinition;
