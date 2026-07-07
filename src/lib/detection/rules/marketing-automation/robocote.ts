import type { TechnologyDefinition } from '../../types';

export const robocoteTechnologyDefinition = {
	id: "robocote",
	name: "Robocote",
	website: "https://robocote.com",
	description: "Robocote is an artificial intelligence–driven platform that supports lead management and digital marketing processes.",
	icon: "Robocote.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "robocote:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.robocote\\.com"),
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
