import type { TechnologyDefinition } from '../../types';

export const woochatTechnologyDefinition = {
	id: "woochat",
	name: "WooChat",
	website: "https://woochat.io",
	description: "WooChat is a marketing automation tool that helps store owners to grow their business.",
	icon: "WooChat.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "woochat:dom:0",
			kind: "dom",
			selector: "link[href*='app.woochat.io/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "woochat:jsGlobal:1",
			kind: "jsGlobal",
			property: "woochat_wa_chat_init",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
