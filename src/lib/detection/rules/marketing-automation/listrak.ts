import type { TechnologyDefinition } from '../../types';

export const listrakTechnologyDefinition = {
	id: "listrak",
	name: "Listrak",
	website: "https://www.listrak.com",
	description: "Listrak is an AI-based marketing automation and CRM solutions that unify, interpret and personalize data to engage customer across channels and devices.",
	icon: "Listrak.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "listrak:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:cdn|s1)\\.listrakbi\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "listrak:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("services\\.listrak\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "listrak:jsGlobal:2",
			kind: "jsGlobal",
			property: "_LTKSignup",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "listrak:jsGlobal:3",
			kind: "jsGlobal",
			property: "_LTKSubscriber",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
