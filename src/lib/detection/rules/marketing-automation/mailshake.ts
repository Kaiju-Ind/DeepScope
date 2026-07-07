import type { TechnologyDefinition } from '../../types';

export const mailshakeTechnologyDefinition = {
	id: "mailshake",
	name: "Mailshake",
	website: "https://mailshake.com",
	description: "Mailshake is an AI-powered sales engagement and B2B lead management platform for creating, automating, and tracking outreach campaigns.",
	icon: "Mailshake.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "mailshake:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.mailshake\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mailshake:jsGlobal:1",
			kind: "jsGlobal",
			property: "Mailshake.clearRecipient",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
