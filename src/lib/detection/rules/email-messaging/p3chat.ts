import type { TechnologyDefinition } from '../../types';

export const p3chatTechnologyDefinition = {
	id: "p3chat",
	name: "P3chat",
	website: "https://p3chat.com",
	description: "P3chat is a live chat platform integrated into websites to enable real-time communication with visitors.",
	icon: "P3chat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "p3chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/p3chat\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
