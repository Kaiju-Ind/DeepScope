import type { TechnologyDefinition } from '../../types';

export const magicbellTechnologyDefinition = {
	id: "magicbell",
	name: "MagicBell",
	website: "https://www.magicbell.com",
	description: "MagicBell is an embeddable notification inbox that allows applications to display and manage user notifications within their interfaces.",
	icon: "MagicBell.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "magicbell:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.magicbell\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "magicbell:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.magicbell\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
