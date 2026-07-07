import type { TechnologyDefinition } from '../../types';

export const correosEcommerceTechnologyDefinition = {
	id: "correos-ecommerce",
	name: "Correos Ecommerce",
	website: "https://www.correosecommerce.com",
	description: "Correos Ecommerce is an ecommerce platfrom from Spain.",
	icon: "Correos.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "correos-ecommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mycorreosecommerce\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "correos-ecommerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "Comandia",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
