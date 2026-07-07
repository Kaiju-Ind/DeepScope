import type { TechnologyDefinition } from '../../types';

export const slateTechnologyDefinition = {
	id: "slate",
	name: "Slate",
	website: "https://technolutions.com",
	description: "Slate is a CRM system designed specifically for higher education institutions, which helps them to manage student interactions, track admissions, and analyze student data in a flexible and user-friendly way.",
	icon: "Slate.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "slate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("slate-technolutions-net\\.cdn\\.technolutions\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "slate:dom:1",
			kind: "dom",
			selector: "link[href*='slate-technolutions-net.cdn.technolutions.net/']",
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
