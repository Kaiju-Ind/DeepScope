import type { TechnologyDefinition } from '../../types';

export const openwebTechnologyDefinition = {
	id: "openweb",
	name: "OpenWeb",
	website: "https://www.openweb.com",
	description: "OpenWeb is a social engagement platform that builds online communities around digital content.",
	icon: "OpenWeb.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "openweb:jsGlobal:0",
			kind: "jsGlobal",
			property: "SPOTIM.initConversation",
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
