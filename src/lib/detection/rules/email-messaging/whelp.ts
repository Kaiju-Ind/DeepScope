import type { TechnologyDefinition } from '../../types';

export const whelpTechnologyDefinition = {
	id: "whelp",
	name: "Whelp",
	website: "https://whelp.co",
	description: "Whelp is an AI-based omnichannel customer support platform that provides automated chatbot-driven assistance across multiple communication channels.",
	icon: "Whelp.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "whelp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.getwhelp\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "whelp:jsGlobal:1",
			kind: "jsGlobal",
			property: "Whelp.Init",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "whelp:jsGlobal:2",
			kind: "jsGlobal",
			property: "WhelpConfig",
			description: "Page-owned global matches a known technology marker.",
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
