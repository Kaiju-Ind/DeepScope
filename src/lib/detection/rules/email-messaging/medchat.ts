import type { TechnologyDefinition } from '../../types';

export const medchatTechnologyDefinition = {
	id: "medchat",
	name: "Medchat",
	website: "https://medchatapp.com",
	description: "Medchat is a HIPAA-compliant platform that provides patient chat services powered by AI agents.",
	icon: "Medchat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "medchat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget-ui\\.medchatapp\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "medchat:jsGlobal:1",
			kind: "jsGlobal",
			property: "MedChat",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "medchat:jsGlobal:2",
			kind: "jsGlobal",
			property: "MedChatApp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
