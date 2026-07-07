import type { TechnologyDefinition } from '../../types';

export const rosanaTechnologyDefinition = {
	id: "rosana",
	name: "Rosana",
	website: "https://rosana.io",
	description: "Rosana is a platform that converts customer interactions into measurable business outcomes through automated conversation management.",
	icon: "Rosana.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "rosana:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.rosana\\.io"),
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
