import type { TechnologyDefinition } from '../../types';

export const octaneAiTechnologyDefinition = {
	id: "octane-ai",
	name: "Octane AI",
	website: "https://www.octaneai.com",
	description: "Octane AI provides an all-in-one platform for engaging quizzes, data collection, and personalised Facebook Messenger and SMS automation.",
	icon: "Octane AI.svg",
	categories: [
		"widgets-misc",
		"email-messaging",
	],
	rules: [
		{
			id: "octane-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.octaneai\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "octane-ai:jsGlobal:1",
			kind: "jsGlobal",
			property: "OctaneConfig",
			description: "Page-owned global matches a known technology marker.",
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
