import type { TechnologyDefinition } from '../../types';

export const stammerAiTechnologyDefinition = {
	id: "stammer-ai",
	name: "Stammer.ai",
	website: "https://stammer.ai",
	description: "Stammer.ai is a platform that enables the creation of custom AI agents tailored for various business needs across different industries.",
	icon: "Stammer.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "stammer-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.stammer\\.ai"),
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
