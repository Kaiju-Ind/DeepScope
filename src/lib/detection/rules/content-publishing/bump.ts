import type { TechnologyDefinition } from '../../types';

export const bumpTechnologyDefinition = {
	id: "bump",
	name: "Bump",
	website: "https://bump.sh",
	description: "Bump is an API contract management platform that helps document and track APIs by identifying changes in API structure, and keeping developers informed through an elegant documentation.",
	icon: "Bump.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "bump:dom:0",
			kind: "dom",
			selector: ".doc-navigation footer, footer.catalog-footer",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "bump:text:1",
			kind: "text",
			pattern: new RegExp("Powered by Bump"),
			description: "Page text contains a known technology marker.",
		},
		{
			id: "bump:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("bump\\.sh\\/packs\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bump:dom:3",
			kind: "dom",
			selector: "body[data-bump]",
			description: "DOM selector matches a known technology marker.",
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
} as const satisfies TechnologyDefinition;
