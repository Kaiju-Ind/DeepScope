import type { TechnologyDefinition } from '../../types';

export const intakerTechnologyDefinition = {
	id: "intaker",
	name: "Intaker",
	website: "https://intaker.com",
	description: "Intaker is a service that enables law firms to send and receive text messages with clients, including automated follow-up messages.",
	icon: "Intaker.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "intaker:dom:0",
			kind: "dom",
			selector: "link[href*='chat-api.intaker.com/api/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "intaker:jsGlobal:1",
			kind: "jsGlobal",
			property: "Intaker",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
