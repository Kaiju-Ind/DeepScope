import type { TechnologyDefinition } from '../../types';

export const envolveTechTechnologyDefinition = {
	id: "envolve-tech",
	name: "Envolve Tech",
	website: "https://envolvetech.com",
	description: "Envolve Tech is a platform that provides virtual shopping assistants designed to guide customers through online purchases.",
	icon: "EnvolveTech.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "envolve-tech:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.envolvetech\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "envolve-tech:jsGlobal:1",
			kind: "jsGlobal",
			property: "envolveChatInitialized",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "envolve-tech:jsGlobal:2",
			kind: "jsGlobal",
			property: "envolveJsonp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
