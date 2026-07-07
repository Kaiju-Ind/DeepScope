import type { TechnologyDefinition } from '../../types';

export const quickcepTechnologyDefinition = {
	id: "quickcep",
	name: "QuickCEP",
	website: "https://www.quickcep.com",
	description: "QuickCEP is an AI-powered chatbot solution to improve business conversions, sales, and customer satisfaction through automated interactions.",
	icon: "QuickCEP.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "quickcep:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.quickcep\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "quickcep:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.quickcep\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
