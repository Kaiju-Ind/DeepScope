import type { TechnologyDefinition } from '../../types';

export const tawkToTechnologyDefinition = {
	id: "tawk-to",
	name: "Tawk.to",
	website: "https://tawk.to",
	description: "Tawk.to is a free messaging app to monitor and chat with the visitors to a website, mobile app.",
	icon: "TawkTo.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "tawk-to:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/embed\\.tawk\\.to"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tawk-to:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^TawkConnectionTime$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "tawk-to:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^tawkconnectiontime$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
