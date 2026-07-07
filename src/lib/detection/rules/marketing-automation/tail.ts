import type { TechnologyDefinition } from '../../types';

export const tailTechnologyDefinition = {
	id: "tail",
	name: "Tail",
	website: "https://www.tail.digital",
	description: "Tail is a customer data management platform.",
	icon: "Tail.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "tail:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tailtarget\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
