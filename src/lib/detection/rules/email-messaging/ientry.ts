import type { TechnologyDefinition } from '../../types';

export const ientryTechnologyDefinition = {
	id: "ientry",
	name: "iEntry",
	website: "https://www.ientry.com",
	description: "iEntry is a full-service email marketing platform offering campaign management, list building, analytics, and targeted messaging for businesses.",
	icon: "iEntry.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "ientry:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.ientry\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
