import type { TechnologyDefinition } from '../../types';

export const poshTechnologyDefinition = {
	id: "posh",
	name: "Posh",
	website: "https://www.posh.ai",
	description: "Posh is a conversational AI platform that enables machines to understand, process, and respond to human language in real time.",
	icon: "Posh.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "posh:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.poshdevelopment\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "posh:jsGlobal:1",
			kind: "jsGlobal",
			property: "posh.close",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "posh:jsGlobal:2",
			kind: "jsGlobal",
			property: "poshie.close",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
