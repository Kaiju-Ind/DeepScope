import type { TechnologyDefinition } from '../../types';

export const sessionstackTechnologyDefinition = {
	id: "sessionstack",
	name: "SessionStack",
	website: "https://www.sessionstack.com",
	description: "SessionStack is an AI-enhanced analytics platform for online retailers, helping convert visitors into customers.",
	icon: "SessionStack.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "sessionstack:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.sessionstack\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sessionstack:jsGlobal:1",
			kind: "jsGlobal",
			property: "SessionStack",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
