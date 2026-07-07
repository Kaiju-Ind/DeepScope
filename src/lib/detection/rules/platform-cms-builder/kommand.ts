import type { TechnologyDefinition } from '../../types';

export const kommandTechnologyDefinition = {
	id: "kommand",
	name: "Kommand",
	website: "https://www.kommand.me",
	description: "Kommand is an all-in-one solution for marketing, store management, and website development.",
	icon: "Kommand.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kommand:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("kommand-bundle\\.min\\.js"),
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
