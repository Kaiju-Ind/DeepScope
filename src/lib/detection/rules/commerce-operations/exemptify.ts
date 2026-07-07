import type { TechnologyDefinition } from '../../types';

export const exemptifyTechnologyDefinition = {
	id: "exemptify",
	name: "Exemptify",
	website: "https://modules4u.biz/exemptify",
	description: "Exemptify allows you to conduct proper EU B2B transactions by validating EU VAT IDs.",
	icon: "Exemptify.png",
	categories: [
		"commerce-operations",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "exemptify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.modules4u\\.biz\\/shopify\\/exemptify"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "exemptify:jsGlobal:1",
			kind: "jsGlobal",
			property: "ExemptifyTriggerUpdate",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "exemptify:jsGlobal:2",
			kind: "jsGlobal",
			property: "m4u_ex_vat_postfix_txt",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
