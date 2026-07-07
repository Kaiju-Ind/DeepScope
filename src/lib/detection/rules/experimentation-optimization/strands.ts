import type { TechnologyDefinition } from '../../types';

export const strandsTechnologyDefinition = {
	id: "strands",
	name: "Strands",
	website: "https://strands.com",
	description: "Strands is a personalization, recommendation, and segmentation engine designed to tailor content and services based on user data.",
	icon: "Strands.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "strands:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.strands\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
