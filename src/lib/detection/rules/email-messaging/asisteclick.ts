import type { TechnologyDefinition } from '../../types';

export const asisteclickTechnologyDefinition = {
	id: "asisteclick",
	name: "AsisteClick",
	website: "https://asisteclick.com",
	description: "AsisteClick is a customer service solution that uses chatbots and an omnichannel platform to streamline support across multiple communication channels.",
	icon: "AsisteClick.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "asisteclick:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.asisteclick\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "asisteclick:jsGlobal:1",
			kind: "jsGlobal",
			property: "loadAsisteClick",
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
