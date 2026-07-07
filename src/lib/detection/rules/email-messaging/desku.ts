import type { TechnologyDefinition } from '../../types';

export const deskuTechnologyDefinition = {
	id: "desku",
	name: "Desku",
	website: "https://desku.io",
	description: "Desku is a customer support tool that helps ecommerce businesses manage and respond to customer inquiries.",
	icon: "Desku.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "desku:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.desku\\.io\\/chat-widget\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "desku:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("livechat\\.desku\\.io\\/cdn\\/widget\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "desku:jsGlobal:2",
			kind: "jsGlobal",
			property: "Desku",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "desku:jsGlobal:3",
			kind: "jsGlobal",
			property: "isDeskuManagerRunning",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "desku:jsGlobal:4",
			kind: "jsGlobal",
			property: "isDeskuWidgetAuthSetup",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "desku:jsGlobal:5",
			kind: "jsGlobal",
			property: "isdeskuManagerRunning",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
