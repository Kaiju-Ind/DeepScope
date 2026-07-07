import type { TechnologyDefinition } from '../../types';

export const ucommerceTechnologyDefinition = {
	id: "ucommerce",
	name: "Ucommerce",
	website: "https://ucommerce.net",
	description: "Ucommerce is an ecommerce platform for enterprise-level online businesses.",
	icon: "Ucommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ucommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("uCommerce\\.facets\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ucommerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "uCommerce",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ucommerce:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("ucommerce\\.facets\\.js"),
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
