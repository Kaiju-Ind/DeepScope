import type { TechnologyDefinition } from '../../types';

export const chatgenTechnologyDefinition = {
	id: "chatgen",
	name: "ChatGen",
	website: "https://chatgen.ai",
	description: "ChatGen is a hybrid chatbot platform designed to facilitate communication with prospects, customers, and internal employees, aiming to reduce turnaround time and improve productivity.",
	icon: "ChatGen.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatgen:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.chatgen\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chatgen:jsGlobal:1",
			kind: "jsGlobal",
			property: "ChatGen",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chatgen:jsGlobal:2",
			kind: "jsGlobal",
			property: "loadChatgen",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
