import type { TechnologyDefinition } from '../../types';

export const jennyTechnologyDefinition = {
	id: "jenny",
	name: "Jenny",
	website: "https://www.getjenny.com",
	description: "Jenny is a customer service chatbot platform.",
	icon: "Jenny.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "jenny:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getjenny\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jenny:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackJsonpget-jenny",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
