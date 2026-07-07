import type { TechnologyDefinition } from '../../types';

export const kontentAiTechnologyDefinition = {
	id: "kontent-ai",
	name: "Kontent.ai",
	website: "https://kontent.ai",
	description: "Kontent.ai is a SaaS-based modular content platform.",
	icon: "Kontent.ai.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kontent-ai:dom:0",
			kind: "dom",
			selector: "img[src*='.kc-usercontent.com'], link[href*='.kc-usercontent.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kontent-ai:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.kc-usercontent\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
