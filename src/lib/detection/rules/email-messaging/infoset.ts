import type { TechnologyDefinition } from '../../types';

export const infosetTechnologyDefinition = {
	id: "infoset",
	name: "Infoset",
	website: "https://infoset.app",
	description: "Infoset is an advanced communication and support solutions.",
	icon: "Infoset.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "infoset:jsGlobal:0",
			kind: "jsGlobal",
			property: "InfosetChat",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "infoset:jsGlobal:1",
			kind: "jsGlobal",
			property: "InfosetRoot",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
