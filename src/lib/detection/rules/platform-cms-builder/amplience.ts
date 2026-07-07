import type { TechnologyDefinition } from '../../types';

export const amplienceTechnologyDefinition = {
	id: "amplience",
	name: "Amplience",
	website: "https://amplience.com",
	description: "Amplience is an API-first, headless content management platform for enterprise retail.",
	icon: "Amplience.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "amplience:dom:0",
			kind: "dom",
			selector: "link[href*='.amplience.net'], img[src*='.amplience.net']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "amplience:jsGlobal:1",
			kind: "jsGlobal",
			property: "amplianceTemplates",
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
