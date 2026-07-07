import type { TechnologyDefinition } from '../../types';

export const snoobiTechnologyDefinition = {
	id: "snoobi",
	name: "Snoobi",
	website: "https://www.snoobi.com",
	description: "Snoobi is a web analytics and visitor tracking tool.",
	icon: "Snoobi.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "snoobi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("snoobi\\.com\\/snoop\\.php"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "snoobi:jsGlobal:1",
			kind: "jsGlobal",
			property: "snoobi",
			description: "Page-owned global matches a known technology marker.",
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
