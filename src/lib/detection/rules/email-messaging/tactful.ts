import type { TechnologyDefinition } from '../../types';

export const tactfulTechnologyDefinition = {
	id: "tactful",
	name: "Tactful",
	website: "https://tactful.ai",
	description: "Tactful is an AI-driven platform that enables seamless customer service across multiple communication channels.",
	icon: "Tactful.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "tactful:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("webchat\\.tactful\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tactful:jsGlobal:1",
			kind: "jsGlobal",
			property: "Tactful.TACTFUL_CLIENT_ID",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
