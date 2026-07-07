import type { TechnologyDefinition } from '../../types';

export const delivraTechnologyDefinition = {
	id: "delivra",
	name: "Delivra",
	website: "https://www.delivra.com",
	description: "Delivra is a premium email marketing tracking software.",
	icon: "Delivra.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "delivra:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("integration\\.delivra\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
