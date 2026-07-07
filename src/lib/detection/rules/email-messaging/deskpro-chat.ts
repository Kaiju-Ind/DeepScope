import type { TechnologyDefinition } from '../../types';

export const deskproChatTechnologyDefinition = {
	id: "deskpro-chat",
	name: "DeskPro Chat",
	website: "https://www.deskpro.com/product/chat",
	description: "DeskPro is multi channel helpdesk software for managing customer and citizen requests via email, forms, chat, social and voice.",
	icon: "DeskPro.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "deskpro-chat:jsGlobal:0",
			kind: "jsGlobal",
			property: "DESKPRO_WIDGET_OPTIONS.chat",
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
