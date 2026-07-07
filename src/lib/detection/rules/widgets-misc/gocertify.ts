import type { TechnologyDefinition } from '../../types';

export const gocertifyTechnologyDefinition = {
	id: "gocertify",
	name: "GoCertify",
	website: "https://www.gocertify.me",
	description: "GoCertify is a conversion-focused and cost-effective way to verify students, key workers, under-26s, over-60s, military and more for exclusive discounts.",
	icon: "GoCertify.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "gocertify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.gocertify\\.me\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gocertify:dom:1",
			kind: "dom",
			selector: "a[href*='secure.gocertify.me']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "gocertify:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^_gocertify_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
