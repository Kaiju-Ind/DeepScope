import type { TechnologyDefinition } from '../../types';

export const webqnaTechnologyDefinition = {
	id: "webqna",
	name: "WebQnA",
	website: "https://webqna.ai",
	description: "WebQnA is a platform that offers generative AI chatbots for businesses to enhance customer interactions and support.",
	icon: "WebQnA.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "webqna:jsGlobal:0",
			kind: "jsGlobal",
			property: "webqna",
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
