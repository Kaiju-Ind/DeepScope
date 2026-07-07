import type { TechnologyDefinition } from '../../types';

export const autoconfTechnologyDefinition = {
	id: "autoconf",
	name: "Autoconf",
	website: "https://autoconf.com.br",
	description: "Autoconf is a system designed for managing car dealership operations, including inventory, sales, and customer data.",
	icon: "Autoconf.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "autoconf:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.autoconf\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
