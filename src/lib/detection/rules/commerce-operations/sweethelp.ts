import type { TechnologyDefinition } from '../../types';

export const sweethelpTechnologyDefinition = {
	id: "sweethelp",
	name: "SweetHelp",
	website: "https://sweethelp.io",
	description: "SweetHelp is a messaging solution that recovers abandoned carts by sending texts via Whatsapp and SMS.",
	icon: "SweetHelp.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "sweethelp:jsGlobal:0",
			kind: "jsGlobal",
			property: "sweetHelpBtnLoad",
			description: "Page-owned global matches a known technology marker.",
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
