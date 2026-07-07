import type { TechnologyDefinition } from '../../types';

export const visitorChatTechnologyDefinition = {
	id: "visitor-chat",
	name: "Visitor Chat",
	website: "https://visitor.chat",
	description: "Visitor Chat is a service that provides businesses with managed automotive live chat solutions to improve customer relationships.",
	icon: "VisitorChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "visitor-chat:jsGlobal:0",
			kind: "jsGlobal",
			property: "VisitorChatInit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "visitor-chat:jsGlobal:1",
			kind: "jsGlobal",
			property: "VisitorChat_Close",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "visitor-chat:jsGlobal:2",
			kind: "jsGlobal",
			property: "VisitorChat_Init",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "visitor-chat:jsGlobal:3",
			kind: "jsGlobal",
			property: "VisitorChat_clearStore",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
