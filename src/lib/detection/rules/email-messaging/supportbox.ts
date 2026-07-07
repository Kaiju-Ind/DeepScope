import type { TechnologyDefinition } from '../../types';

export const supportboxTechnologyDefinition = {
	id: "supportbox",
	name: "SupportBox",
	website: "https://supportbox.cz",
	description: "SupportBox is a customer support platform that uses AI to deliver intelligent assistance for handling user inquiries and support interactions.",
	icon: "SupportBox.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "supportbox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("chat\\.supportbox\\.cz\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "supportbox:jsGlobal:1",
			kind: "jsGlobal",
			property: "supportBoxApi",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "supportbox:jsGlobal:2",
			kind: "jsGlobal",
			property: "supportBoxChatConfig",
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
