import type { TechnologyDefinition } from '../../types';

export const uspsTechnologyDefinition = {
	id: "usps",
	name: "USPS",
	website: "https://www.usps.com",
	description: "The United States Postal Service (USPS) is an independent agency of the executive branch of the United States federal government responsible for providing postal service in the United States.",
	icon: "USPS.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "usps:text:0",
			kind: "text",
			pattern: new RegExp("\\bUSPS\\b"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "usps:text:1",
			kind: "text",
			pattern: new RegExp("\\bUnited States Postal Service\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
