import type { TechnologyDefinition } from '../../types';

export const vergicTechnologyDefinition = {
	id: "vergic",
	name: "Vergic",
	website: "https://www.vergic.com",
	description: "Vergic is a platform facilitating real-time online engagement between site owners, customer service agents, and individual customers, prospects, or visitors.",
	icon: "Vergic.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "vergic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("us-content\\.vergic\\.com\\/"),
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
