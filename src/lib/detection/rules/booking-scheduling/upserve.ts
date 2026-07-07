import type { TechnologyDefinition } from '../../types';

export const upserveTechnologyDefinition = {
	id: "upserve",
	name: "Upserve",
	website: "https://onlineordering.upserve.com",
	description: "Upserve is a restaurant management solution featuring an Android or iOS-based point-of-sale system, online ordering, contactless payments, automated inventory management, sales analytics, and more.",
	icon: "Upserve.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "upserve:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.upserve\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "upserve:dom:1",
			kind: "dom",
			selector: "a[href*='app.upserve.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
