import type { TechnologyDefinition } from '../../types';

export const faveoTechnologyDefinition = {
	id: "faveo",
	name: "Faveo",
	website: "https://faveohelpdesk.com",
	description: "Faveo is an open source help desk system and ticket management tool that enables tracking, assignment, and resolution of support tickets.",
	icon: "Faveo.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "faveo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/lb-faveo\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "faveo:dom:1",
			kind: "dom",
			selector: "link[href*='/lb-faveo/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"mid",
			"onetime",
			"poa",
			"recurring",
		],
	},
	requires: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
