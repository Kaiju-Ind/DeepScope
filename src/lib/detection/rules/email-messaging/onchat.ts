import type { TechnologyDefinition } from '../../types';

export const onchatTechnologyDefinition = {
	id: "onchat",
	name: "OnChat",
	website: "https://onchat.ai",
	description: "OnChat is a platform that uses an AI chatbot to handle customer support interactions while assisting with sales-related inquiries and customer communication.",
	icon: "OnChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "onchat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("onchat\\.ai\\/onchat\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "onchat:jsGlobal:1",
			kind: "jsGlobal",
			property: "extractOnchatClickFromHref",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "onchat:jsGlobal:2",
			kind: "jsGlobal",
			property: "getOnchatClickFromURL",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
