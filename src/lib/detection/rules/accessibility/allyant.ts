import type { TechnologyDefinition } from '../../types';

export const allyantTechnologyDefinition = {
	id: "allyant",
	name: "Allyant",
	website: "https://accessible360.com",
	description: "Allyant is a company specializing in accessibility solutions for digital and print documents to ensure compliance with accessibility standards.",
	icon: "Allyant.svg",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "allyant:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/npm\\/@accessible360\\/accessible-slick@([\\d\\.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "allyant:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/accessible360\\/accessible-slick\\/slick\\/slick\\.min\\.js\\?v=([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "allyant:dom:2",
			kind: "dom",
			selector: "a[href*='accessible360.com/'][target='_blank'], a[href*='accessible360.com/'] > img",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
