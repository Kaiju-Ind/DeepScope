import type { TechnologyDefinition } from '../../types';

export const vertaflowChatTechnologyDefinition = {
	id: "vertaflow-chat",
	name: "VertaFlow Chat",
	website: "https://vertaflow.io",
	description: "VertaFlow Chat is a lightweight embeddable chat widget that routes messages to VertaFlow CRM tickets.",
	icon: "VertaFlow.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "vertaflow-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("vertaflow\\.io\\/v1\\/chat\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
