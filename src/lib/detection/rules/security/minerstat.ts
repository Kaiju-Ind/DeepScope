import type { TechnologyDefinition } from '../../types';

export const minerstatTechnologyDefinition = {
	id: "minerstat",
	name: "Minerstat",
	website: "https://minerstat.com",
	description: "Minerstat is a software provider offering management solutions for crypto mining professionals and mining farms.",
	icon: "Minerstat.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "minerstat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.minerstat\\.com"),
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
