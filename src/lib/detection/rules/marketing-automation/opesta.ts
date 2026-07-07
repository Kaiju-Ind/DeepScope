import type { TechnologyDefinition } from '../../types';

export const opestaTechnologyDefinition = {
	id: "opesta",
	name: "Opesta",
	website: "https://opesta.com",
	description: "Opesta is a marketing automation platform for Facebook Messenger.",
	icon: "Opesta.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "opesta:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.opesta\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
