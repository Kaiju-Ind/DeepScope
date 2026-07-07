import type { TechnologyDefinition } from '../../types';

export const primeAiTechnologyDefinition = {
	id: "prime-ai",
	name: "Prime AI",
	website: "https://www.primeai.co.uk",
	description: "Prime AI is a platform that uses AI-powered technology to match customers' body shapes with garment SKU specifications, helping them choose the best-fitting clothing size.",
	icon: "PrimeAI.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "prime-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.primeai\\.co\\.uk"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
