import type { TechnologyDefinition } from '../../types';

export const baseetTechnologyDefinition = {
	id: "baseet",
	name: "Baseet",
	website: "https://www.baseet.cc",
	description: "Baseet is an ecommerce platform for building and managing online stores.",
	icon: "Baseet.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "baseet:url:0",
			kind: "url",
			pattern: new RegExp("^https?:\\/\\/[^/]+\\.baseet\\.cc"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "baseet:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^_baseet_landing_page$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
