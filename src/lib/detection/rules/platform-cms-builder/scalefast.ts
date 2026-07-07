import type { TechnologyDefinition } from '../../types';

export const scalefastTechnologyDefinition = {
	id: "scalefast",
	name: "Scalefast",
	website: "https://www.scalefast.com",
	description: "Scalefast is an outsourced ecommerce solution designed to build and manage global ecommerce for brands, with customer loyalty programs.",
	icon: "Scalefast.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "scalefast:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn-prod\\.scalefast\\.com\\/(?:.+\\.js\\?version=([\\d\\.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
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
