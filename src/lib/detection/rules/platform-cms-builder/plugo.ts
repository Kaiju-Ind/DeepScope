import type { TechnologyDefinition } from '../../types';

export const plugoTechnologyDefinition = {
	id: "plugo",
	name: "Plugo",
	website: "http://plugo.co",
	description: "Plugo is an ecommerce platform for online selling that enables businesses to start, manage, and grow their operations.",
	icon: "Plugo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "plugo:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("shop\\.plugo\\.world"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
