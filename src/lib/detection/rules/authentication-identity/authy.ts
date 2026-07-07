import type { TechnologyDefinition } from '../../types';

export const authyTechnologyDefinition = {
	id: "authy",
	name: "Authy",
	website: "https://www.authy.com",
	description: "Authy is a security tool that enables two-factor authentication (2FA) for websites to help protect user accounts from unauthorized access.",
	icon: "Authy.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "authy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.authy\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
