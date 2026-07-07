import type { TechnologyDefinition } from '../../types';

export const zendeskTechnologyDefinition = {
	id: "zendesk",
	name: "Zendesk",
	website: "https://zendesk.com",
	description: "Zendesk is a cloud-based help desk management solution offering customizable tools to build customer service portal, knowledge base and online communities.",
	icon: "Zendesk.svg",
	categories: [
		"content-publishing",
		"developer-tooling",
		"email-messaging",
	],
	rules: [
		{
			id: "zendesk:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.zdassets\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zendesk:jsGlobal:1",
			kind: "jsGlobal",
			property: "Zendesk",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zendesk:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^_help_center_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "zendesk:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^_zendesk_cookie$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "zendesk:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^_zendesk_shared_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "zendesk:dns:5",
			kind: "dns",
			valuePattern: new RegExp("mail\\.zendesk\\.com", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
		],
	},
} as const satisfies TechnologyDefinition;
