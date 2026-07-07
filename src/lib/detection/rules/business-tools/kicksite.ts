import type { TechnologyDefinition } from '../../types';

export const kicksiteTechnologyDefinition = {
	id: "kicksite",
	name: "Kicksite",
	website: "https://kicksite.com",
	description: "Kicksite is a gym and martial arts member management software with attendance tracking, automated billing, free texting, lead capture forms and more.",
	icon: "Kicksite.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "kicksite:dom:0",
			kind: "dom",
			selector: "iframe[src*='.kicksite.net/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kicksite:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^_kicksite_session$", "i"),
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
} as const satisfies TechnologyDefinition;
