import type { TechnologyDefinition } from '../../types';

export const w3counterTechnologyDefinition = {
	id: "w3counter",
	name: "W3Counter",
	website: "https://www.w3counter.com",
	description: "W3Counter is a web analytics service that provides free and paid tools for tracking visitor statistics and offers customizable website widgets to enhance user engagement.",
	icon: "W3Counter.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "w3counter:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("w3counter\\.com\\/tracker\\.js"),
			description: "Script source URL matches a known technology marker.",
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
