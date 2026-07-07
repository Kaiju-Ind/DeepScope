import type { TechnologyDefinition } from '../../types';

export const zokoTechnologyDefinition = {
	id: "zoko",
	name: "Zoko",
	website: "https://www.zoko.io/",
	description: "Zoko is an all-in-one system that leverages the WhatsApp API to help you do business, on WhatsApp",
	icon: "Zoko.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "zoko:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("zoko-shopify-prod\\.web\\.app"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zoko:jsGlobal:1",
			kind: "jsGlobal",
			property: "__zoko_app_version",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
	implies: [
		"whatsapp-business-chat",
	],
} as const satisfies TechnologyDefinition;
