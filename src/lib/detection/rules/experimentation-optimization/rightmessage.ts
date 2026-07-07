import type { TechnologyDefinition } from '../../types';

export const rightmessageTechnologyDefinition = {
	id: "rightmessage",
	name: "RightMessage",
	website: "https://rightmessage.com",
	description: "RightMessage is a real-time content personalization tool.",
	icon: "RightMessage.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "rightmessage:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tag\\.rightmessage\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
