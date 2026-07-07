import type { TechnologyDefinition } from '../../types';

export const atomeTechnologyDefinition = {
	id: "atome",
	name: "Atome",
	website: "https://www.atome.sg/",
	description: "Atome is a brand that allows users to purchase products online and pay for them in monthly installments.",
	icon: "atome.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "atome:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("gateway\\.apaylater\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "atome:jsGlobal:1",
			kind: "jsGlobal",
			property: "atomeWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
