import type { TechnologyDefinition } from '../../types';

export const intervoTechnologyDefinition = {
	id: "intervo",
	name: "Intervo",
	website: "https://intervo.ai",
	description: "Intervo is a platform for building and managing enterprise-grade voice agents at scale, enabling reliable voice automation, system integration, and deployment across large organizations.",
	icon: "Intervo.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "intervo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.intervo\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "intervo:jsGlobal:1",
			kind: "jsGlobal",
			property: "IntervoWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"mid",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
