import type { TechnologyDefinition } from '../../types';

export const polodaAiTechnologyDefinition = {
	id: "poloda-ai",
	name: "Poloda AI",
	website: "https://www.polodaai.com",
	description: "Poloda AI is an accessibility solution designed to ensure compliance with accessibility standards and regulations.",
	icon: "PolodaAI.svg",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "poloda-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.polodaai\\.com"),
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
