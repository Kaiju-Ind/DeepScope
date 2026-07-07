import type { TechnologyDefinition } from '../../types';

export const vopTechnologyDefinition = {
	id: "vop",
	name: "Vop",
	website: "https://getvop.com",
	description: "Vop is a service facilitating the integration of ecommerce into social content.",
	icon: "Vop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.getvop\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
