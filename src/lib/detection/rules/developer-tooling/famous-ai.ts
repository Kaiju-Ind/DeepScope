import type { TechnologyDefinition } from '../../types';

export const famousAiTechnologyDefinition = {
	id: "famous-ai",
	name: "Famous.ai",
	website: "https://famous.ai",
	description: "Famous.ai is a platform that transforms written concepts into functional mobile or web applications using artificial intelligence.",
	icon: "FamousAI.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "famous-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.famous\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
