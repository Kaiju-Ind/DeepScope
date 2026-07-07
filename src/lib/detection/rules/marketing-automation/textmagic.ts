import type { TechnologyDefinition } from '../../types';

export const textmagicTechnologyDefinition = {
	id: "textmagic",
	name: "Textmagic",
	website: "https://www.textmagic.com",
	description: "Textmagic is a messaging platform for sending SMS and email campaigns designed to generate clicks, responses, and revenue.",
	icon: "Textmagic.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "textmagic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("my\\.textmagic\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
