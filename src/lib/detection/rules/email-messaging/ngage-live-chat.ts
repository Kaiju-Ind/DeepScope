import type { TechnologyDefinition } from '../../types';

export const ngageLiveChatTechnologyDefinition = {
	id: "ngage-live-chat",
	name: "Ngage Live Chat",
	website: "https://www.ngagelive.com",
	description: "Ngage Live Chat is an industry-specific live chat solution that converts website visitors into clients.",
	icon: "NgageLiveChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "ngage-live-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("messenger\\.ngageics\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ngage-live-chat:jsGlobal:1",
			kind: "jsGlobal",
			property: "NgageKillScript",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ngage-live-chat:jsGlobal:2",
			kind: "jsGlobal",
			property: "StartNgageChat",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
