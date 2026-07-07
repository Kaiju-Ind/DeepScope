import type { TechnologyDefinition } from '../../types';

export const uvodoTechnologyDefinition = {
	id: "uvodo",
	name: "Uvodo",
	website: "https://uvodo.com",
	description: "Uvodo is an ecommerce platform built with React, PHP, and MySQL, offering local and global payment integration, robust selling tools, and no additional expenses.",
	icon: "Uvodo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "uvodo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.uvo\\.do\\/"),
			description: "Script source URL matches a known technology marker.",
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
	implies: [
		"mysql",
		"php",
		"react",
	],
} as const satisfies TechnologyDefinition;
