import type { TechnologyDefinition } from '../../types';

export const pushnewsTechnologyDefinition = {
	id: "pushnews",
	name: "Pushnews",
	website: "https://pushnews.com.br",
	description: "Pushnews is a web push notification and marketing platform that enables websites to send targeted browser notifications to subscribers for communication, engagement, and promotional campaigns.",
	icon: "Pushnews.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "pushnews:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pushnewsbr\\.pushnews"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pushnews:jsGlobal:1",
			kind: "jsGlobal",
			property: "loadPushNewsFile",
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
