import type { TechnologyDefinition } from '../../types';

export const apexchatTechnologyDefinition = {
	id: "apexchat",
	name: "ApexChat",
	website: "https://www.apexchat.com",
	description: "ApexChat is a company that provides businesses with live chat software and services to facilitate real-time customer engagement, support, lead generation, and enhanced online interactions.",
	icon: "ApexChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "apexchat:jsGlobal:0",
			kind: "jsGlobal",
			property: "ApexChat",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "apexchat:jsGlobal:1",
			kind: "jsGlobal",
			property: "apexchat_dompopup_chatwindow_client",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
