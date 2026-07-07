import type { TechnologyDefinition } from '../../types';

export const smileeTechnologyDefinition = {
	id: "smilee",
	name: "Smilee",
	website: "https://smilee.io",
	description: "Smilee is a professionally managed chat solution designed to facilitate customer communication.",
	icon: "Smilee.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "smilee:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("saas\\.smilee\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
