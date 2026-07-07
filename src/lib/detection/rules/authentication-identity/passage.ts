import type { TechnologyDefinition } from '../../types';

export const passageTechnologyDefinition = {
	id: "passage",
	name: "Passage",
	website: "https://passage.1password.com",
	description: "Passage, a feature provided by 1Password, enables easy implementation of passwordless authentication methods on websites and apps.",
	icon: "Passage.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "passage:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.1password\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
