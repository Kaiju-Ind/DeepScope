import type { TechnologyDefinition } from '../../types';

export const gladlyTechnologyDefinition = {
	id: "gladly",
	name: "Gladly",
	website: "https://www.gladly.com",
	description: "Gladly is a customer service platform.",
	icon: "Gladly.png",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "gladly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.gladly\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gladly:jsGlobal:1",
			kind: "jsGlobal",
			property: "Gladly",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
