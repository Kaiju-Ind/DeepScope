import type { TechnologyDefinition } from '../../types';

export const zoominfoChatTechnologyDefinition = {
	id: "zoominfo-chat",
	name: "Zoominfo Chat",
	website: "https://www.zoominfo.com/chat",
	description: "ZoomInfo chat is a live chat solution.",
	icon: "Zoominfo.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "zoominfo-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("madstreetden\\.widget\\.insent\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
