import type { TechnologyDefinition } from '../../types';

export const zwayamTechnologyDefinition = {
	id: "zwayam",
	name: "Zwayam",
	website: "https://www.zwayam.com",
	description: "Zwayam is a recruitment software designed to manage the entire hiring process.",
	icon: "Zwayam.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "zwayam:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/zwayam\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zwayam:dom:1",
			kind: "dom",
			selector: "link[href*='/zwayam.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
