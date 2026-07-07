import type { TechnologyDefinition } from '../../types';

export const neexaTechnologyDefinition = {
	id: "neexa",
	name: "Neexa",
	website: "https://neexa.ai",
	description: "Neexa is an AI-powered inquiry and sales agent designed to handle customer queries.",
	icon: "NeexaAI.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "neexa:jsGlobal:0",
			kind: "jsGlobal",
			property: "neexa_xgmx_cc_wpq_ms",
			description: "Page-owned global matches a known technology marker.",
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
