import type { TechnologyDefinition } from '../../types';

export const spicyRocketTechnologyDefinition = {
	id: "spicy-rocket",
	name: "Spicy Rocket",
	website: "https://spicyrocket.xyz",
	description: "Spicy Rocket is a web design and digital development platform providing innovative solutions to enhance online business performance.",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "spicy-rocket:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.spicyrocket\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "spicy-rocket:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^spicyrocket_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
