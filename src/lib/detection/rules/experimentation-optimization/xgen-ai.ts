import type { TechnologyDefinition } from '../../types';

export const xgenAiTechnologyDefinition = {
	id: "xgen-ai",
	name: "XGen Ai",
	website: "https://xgen.ai",
	description: "XGen Ai is a cloud-based customer journey mapping tool that helps businesses manage product recommendations via artificial intelligence (AI).",
	icon: "XGen Ai.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "xgen-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/assets\\.xgen\\.dev\\/"),
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
