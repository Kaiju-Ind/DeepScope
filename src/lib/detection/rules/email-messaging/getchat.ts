import type { TechnologyDefinition } from '../../types';

export const getchatTechnologyDefinition = {
	id: "getchat",
	name: "GetChat",
	website: "https://getchat.app",
	description: "GetChat is a platform enabling communication with website visitors via preferred messaging applications.",
	icon: "GetChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "getchat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("getchat\\.app\\/"),
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
