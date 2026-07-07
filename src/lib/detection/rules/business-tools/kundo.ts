import type { TechnologyDefinition } from '../../types';

export const kundoTechnologyDefinition = {
	id: "kundo",
	name: "Kundo",
	website: "https://www.kundo.se",
	description: "Kundo is a customer service system for all digital channels, enhanced with AI and automation to resolve inquiries.",
	icon: "Kundo.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "kundo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static-chat\\.kundo\\.se"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kundo:jsGlobal:1",
			kind: "jsGlobal",
			property: "$kundo_chat.DEFAULT_AVATAR_URL",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
