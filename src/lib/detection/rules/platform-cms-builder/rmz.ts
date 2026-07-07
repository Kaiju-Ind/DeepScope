import type { TechnologyDefinition } from '../../types';

export const rmzTechnologyDefinition = {
	id: "rmz",
	name: "RMZ",
	website: "https://rmz.gg",
	description: "RMZ is a platform that allows users to create a store with features including payment processing, management tools, and access to statistics.",
	icon: "RMZ.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rmz:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.rmz\\.gg\\/"),
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
} as const satisfies TechnologyDefinition;
