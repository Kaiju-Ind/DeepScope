import type { TechnologyDefinition } from '../../types';

export const omnisendTechnologyDefinition = {
	id: "omnisend",
	name: "Omnisend",
	website: "https://www.omnisend.com",
	description: "Omnisend is an ecommerce marketing automation platform that provides an omnichannel marketing strategy for businesses.",
	icon: "Omnisend.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "omnisend:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("omnisrc\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "omnisend:jsGlobal:1",
			kind: "jsGlobal",
			property: "_omnisend",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "omnisend:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^omnisendSessionID$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "omnisend:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^omnisendsessionid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
