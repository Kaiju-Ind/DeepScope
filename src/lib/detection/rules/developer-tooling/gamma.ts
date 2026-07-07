import type { TechnologyDefinition } from '../../types';

export const gammaTechnologyDefinition = {
	id: "gamma",
	name: "Gamma",
	website: "https://gamma.app",
	description: "Gamma is an AI-powered platform for creating presentations, documents, and websites without requiring design or coding skills.",
	icon: "Gamma.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "gamma:jsGlobal:0",
			kind: "jsGlobal",
			property: "gammaSiteAnimationsInitialized",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gamma:jsGlobal:1",
			kind: "jsGlobal",
			property: "gammaTiming",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gamma:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^gamma_visitor_id$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
