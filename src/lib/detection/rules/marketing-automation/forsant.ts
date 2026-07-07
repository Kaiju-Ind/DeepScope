import type { TechnologyDefinition } from '../../types';

export const forsantTechnologyDefinition = {
	id: "forsant",
	name: "Forsant",
	website: "https://forsant.io",
	description: "Forsant is a tool that automates Google Ads setup, audience targeting, and campaign optimization, eliminating the need for manual configuration.",
	icon: "Forsant.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "forsant:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pixel\\.forsant\\.io"),
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
