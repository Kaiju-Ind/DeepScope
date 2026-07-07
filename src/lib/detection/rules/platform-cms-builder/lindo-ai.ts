import type { TechnologyDefinition } from '../../types';

export const lindoAiTechnologyDefinition = {
	id: "lindo-ai",
	name: "Lindo.ai",
	website: "https://lindo.ai",
	description: "Lindo.ai is an AI-based website builder that generates and customizes websites from user inputs without requiring coding knowledge.",
	icon: "Lindo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "lindo-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.lindoai\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
