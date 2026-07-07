import type { TechnologyDefinition } from '../../types';

export const cemaxTechnologyDefinition = {
	id: "cemax",
	name: "CEMax",
	website: "https://cemax.ai",
	description: "CEMax is a premium customer engagement platform.",
	icon: "CEMax.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "cemax:dom:0",
			kind: "dom",
			selector: "div[data-chat-url*='.cemaxai.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
