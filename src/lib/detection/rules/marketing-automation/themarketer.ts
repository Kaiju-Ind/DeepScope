import type { TechnologyDefinition } from '../../types';

export const themarketerTechnologyDefinition = {
	id: "themarketer",
	name: "theMarketer",
	website: "https://themarketer.com",
	description: "theMarketer is a marketing platform that includes a loyalty program.",
	icon: "theMarketer.svg",
	categories: [
		"marketing-automation",
		"commerce-operations",
	],
	rules: [
		{
			id: "themarketer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("t\\.themarketer\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "themarketer:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^themarketerbackend_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
