import type { TechnologyDefinition } from '../../types';

export const liberapayTechnologyDefinition = {
	id: "liberapay",
	name: "Liberapay",
	website: "https://liberapay.com/",
	description: "Liberapay is a non-profit organisation subscription payment platform.",
	icon: "Liberapay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "liberapay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/liberapay\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "liberapay:dom:1",
			kind: "dom",
			selector: "a[href*='//liberapay.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
