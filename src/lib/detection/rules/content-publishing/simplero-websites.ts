import type { TechnologyDefinition } from '../../types';

export const simpleroWebsitesTechnologyDefinition = {
	id: "simplero-websites",
	name: "Simplero Websites",
	website: "https://simplero.com/websites",
	description: "Simplero Websites are a learning management system which suited for courses, coaching programs, memberships and digital products by Simplero.",
	icon: "Simplero.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "simplero-websites:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^_simplero_session_id$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	implies: [
		"cart-functionality",
	],
} as const satisfies TechnologyDefinition;
