import type { TechnologyDefinition } from '../../types';

export const mycredTechnologyDefinition = {
	id: "mycred",
	name: "MyCred",
	website: "https://mycred.me",
	description: "MyCred is a points management system for WordPress that allows sites to define, track, and adjust user points based on custom rules and interactions.",
	icon: "MyCred.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "mycred:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/mycred\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mycred:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/mycred/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
