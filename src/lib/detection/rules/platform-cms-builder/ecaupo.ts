import type { TechnologyDefinition } from '../../types';

export const ecaupoTechnologyDefinition = {
	id: "ecaupo",
	name: "eCaupo",
	website: "https://www.ecaupo.com",
	description: "eCaupo is no delivery portal, but your own shop.",
	icon: "eCaupo.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ecaupo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ecaupo\\.(?:at|com)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
