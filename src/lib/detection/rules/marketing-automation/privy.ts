import type { TechnologyDefinition } from '../../types';

export const privyTechnologyDefinition = {
	id: "privy",
	name: "Privy",
	website: "https://www.privy.com",
	description: "Privy is a all-in-one marketing automation platform for ecommerce.",
	icon: "Privy.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "privy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.privy\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "privy:jsGlobal:1",
			kind: "jsGlobal",
			property: "Privy",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "privy:jsGlobal:2",
			kind: "jsGlobal",
			property: "PrivyWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "privy:jsGlobal:3",
			kind: "jsGlobal",
			property: "privySettings",
			description: "Page-owned global matches a known technology marker.",
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
