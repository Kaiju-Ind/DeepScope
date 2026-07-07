import type { TechnologyDefinition } from '../../types';

export const visitorvilleTechnologyDefinition = {
	id: "visitorville",
	name: "VisitorVille",
	website: "http://visitorville.com",
	description: "VisitorVille is a tool that visualizes website visitors as a SimCity-like map, providing an interactive way to analyze traffic and user behavior.",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "visitorville:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.visitorville\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
