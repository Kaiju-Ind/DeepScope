import type { TechnologyDefinition } from '../../types';

export const onlineChatCentersTechnologyDefinition = {
	id: "online-chat-centers",
	name: "Online Chat Centers",
	website: "https://www.onlinechatcenters.com",
	description: "Online Chat Centers is a live chat software platform designed to integrate with websites, enabling real-time customer communication and support across different online environments.",
	icon: "OCC.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "online-chat-centers:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.onlinechatcenters\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "online-chat-centers:jsGlobal:1",
			kind: "jsGlobal",
			property: "occEmbedClick",
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
