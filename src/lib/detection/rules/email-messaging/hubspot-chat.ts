import type { TechnologyDefinition } from '../../types';

export const hubspotChatTechnologyDefinition = {
	id: "hubspot-chat",
	name: "HubSpot Chat",
	website: "https://www.hubspot.com/products/crm/live-chat",
	description: "HubSpot Chat is a tool where you can view, manage, and reply to incoming messages from multiple channels.",
	icon: "HubSpot.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "hubspot-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.usemessages\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hubspot-chat:jsGlobal:1",
			kind: "jsGlobal",
			property: "HubSpotConversations",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
