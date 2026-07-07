import type { TechnologyDefinition } from '../../types';

export const visitortrackingTechnologyDefinition = {
	id: "visitortracking",
	name: "VisitorTracking",
	website: "https://visitortracking.com",
	description: "VisitorTracking is a website analytics solution that monitors visitor behavior and measures conversion events across web pages.",
	icon: "VisitorTracking.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "visitortracking:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.visitortracking\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
