import type { TechnologyDefinition } from '../../types';

export const sellyTechnologyDefinition = {
	id: "selly",
	name: "Selly",
	website: "https://selly.io/",
	description: "Selly is an ecommerce platform for selling digital goods.",
	icon: "Selly.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "selly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.selly\\.(?:gg|io)"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
