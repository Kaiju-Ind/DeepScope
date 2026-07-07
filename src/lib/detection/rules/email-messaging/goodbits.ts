import type { TechnologyDefinition } from '../../types';

export const goodbitsTechnologyDefinition = {
	id: "goodbits",
	name: "Goodbits",
	website: "https://goodbits.io",
	description: "Goodbits is email newsletter creation software designed to help collect and curate content for sending newsletters.",
	icon: "Goodbits.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "goodbits:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^_goodbits_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
