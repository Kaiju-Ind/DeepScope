import type { TechnologyDefinition } from '../../types';

export const boostAiTechnologyDefinition = {
	id: "boost-ai",
	name: "Boost.ai",
	website: "https://boost.ai",
	description: "Boost.ai is a conversational AI platform designed to increase self-service rates and elevate customer satisfaction levels through end-to-end solutions.",
	icon: "BoostAI.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "boost-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.boost\\.ai\\/chatPanel\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "boost-ai:dom:1",
			kind: "dom",
			selector: "link[href*='.boost.ai']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "boost-ai:jsGlobal:2",
			kind: "jsGlobal",
			property: "boost",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "boost-ai:jsGlobal:3",
			kind: "jsGlobal",
			property: "boostChatPanel",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "boost-ai:jsGlobal:4",
			kind: "jsGlobal",
			property: "boostInit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "boost-ai:scriptSrc:5",
			kind: "scriptSrc",
			pattern: new RegExp("\\.boost\\.ai\\/chatpanel\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
