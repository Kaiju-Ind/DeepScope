import type { TechnologyDefinition } from '../../types';

export const pusherTechnologyDefinition = {
	id: "pusher",
	name: "Pusher",
	website: "https://pusher.com",
	description: "Pusher is a platform that enables real-time experiences for mobile and web applications through scalable messaging and data synchronization.",
	icon: "Pusher.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "pusher:jsGlobal:0",
			kind: "jsGlobal",
			property: "PUSHER_APP_ID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pusher:jsGlobal:1",
			kind: "jsGlobal",
			property: "Pusher.Runtime",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pusher:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("(?:ws-[a-z0-9-]+\\.pusher\\.com|sockjs-[a-z0-9-]+\\.pusher\\.com|\\.pusher\\.com)", "i"),
			confidence: 65,
			description: "Content Security Policy allows Pusher realtime connection hosts.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
