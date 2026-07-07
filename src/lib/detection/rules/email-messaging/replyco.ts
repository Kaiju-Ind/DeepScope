import type { TechnologyDefinition } from '../../types';

export const replycoTechnologyDefinition = {
	id: "replyco",
	name: "Replyco",
	website: "https://replyco.com",
	description: "Replyco is a helpdesk software designed for ecommerce sellers to manage and centralise inbox messages across various marketplaces.",
	icon: "Replyco.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "replyco:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.replyco\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "replyco:jsGlobal:1",
			kind: "jsGlobal",
			property: "replycoChat",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
