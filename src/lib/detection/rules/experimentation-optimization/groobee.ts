import type { TechnologyDefinition } from '../../types';

export const groobeeTechnologyDefinition = {
	id: "groobee",
	name: "Groobee",
	website: "https://groobee.net",
	description: "Groobee is a solution for personalized ecommerce marketing, offering features to support customer personalization.",
	icon: "Groobee.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "groobee:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.groobee\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "groobee:jsGlobal:1",
			kind: "jsGlobal",
			property: "groobee",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
