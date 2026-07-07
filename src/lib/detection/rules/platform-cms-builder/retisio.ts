import type { TechnologyDefinition } from '../../types';

export const retisioTechnologyDefinition = {
	id: "retisio",
	name: "Retisio",
	website: "https://www.retisio.com",
	description: "Retisio is a digital commerce platform that enables retailers to increase sales, reduce costs, and manage risk through ecommerce software solutions.",
	icon: "Retisio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "retisio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.retisio\\.io\\/retisio-sdk\\.js"),
			description: "Script source URL matches a known technology marker.",
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
