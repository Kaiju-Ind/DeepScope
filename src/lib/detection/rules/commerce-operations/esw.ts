import type { TechnologyDefinition } from '../../types';

export const eswTechnologyDefinition = {
	id: "esw",
	name: "ESW",
	website: "https://esw.com",
	description: "ESW (eShopWorld) is a company providing payments, shipping, and delivery services focusing on cross-border ecommerce.",
	icon: "ESW.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "esw:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("Eswhooks\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "esw:jsGlobal:1",
			kind: "jsGlobal",
			property: "eshopworld",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "esw:jsGlobal:2",
			kind: "jsGlobal",
			property: "eswRetailerDisplayConfiguration",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "esw:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("eswhooks\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
