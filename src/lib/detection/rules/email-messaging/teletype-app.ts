import type { TechnologyDefinition } from '../../types';

export const teletypeAppTechnologyDefinition = {
	id: "teletype-app",
	name: "Teletype App",
	website: "https://teletype.app",
	description: "Teletype App is a messenger platform that enables real-time text-based communication between users across connected devices.",
	icon: "TeletypeApp.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "teletype-app:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.teletype\\.app"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "teletype-app:jsGlobal:1",
			kind: "jsGlobal",
			property: "_teletypeWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "teletype-app:jsGlobal:2",
			kind: "jsGlobal",
			property: "teletypeExternalId",
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
