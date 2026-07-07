import type { TechnologyDefinition } from '../../types';

export const linkzTechnologyDefinition = {
	id: "linkz",
	name: "Linkz",
	website: "https://linkz.ai",
	description: "Linkz is a platform designed to maximize visitor retention by optimizing user engagement and interaction across digital channels.",
	icon: "Linkz.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "linkz:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.linkz\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "linkz:jsGlobal:1",
			kind: "jsGlobal",
			property: "LINKZ_AI_ACTIVATED",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "linkz:jsGlobal:2",
			kind: "jsGlobal",
			property: "LINKZ_AI_KEY",
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
