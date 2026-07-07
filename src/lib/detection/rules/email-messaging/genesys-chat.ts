import type { TechnologyDefinition } from '../../types';

export const genesysChatTechnologyDefinition = {
	id: "genesys-chat",
	name: "Genesys Chat",
	website: "https://www.genesys.com/capabilities/live-chat-software",
	description: "Genesys Chat is a customer engagement platform that facilitates real-time communication between businesses and their customers through web messaging and live chat functionalities.",
	icon: "Genesys Cloud.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "genesys-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.boldchat\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
