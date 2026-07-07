import type { TechnologyDefinition } from '../../types';

export const trumpiaTechnologyDefinition = {
	id: "trumpia",
	name: "Trumpia",
	website: "https://www.trumpia.com",
	description: "Trumpia is a marketing platform that supports multiple channels, including mobile, email, social media, voice, and chat marketing.",
	icon: "Trumpia.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "trumpia:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.trumpia\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trumpia:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^TrumpiaReferer$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "trumpia:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^trumpiareferer$", "i"),
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
