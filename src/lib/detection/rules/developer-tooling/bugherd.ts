import type { TechnologyDefinition } from '../../types';

export const bugherdTechnologyDefinition = {
	id: "bugherd",
	name: "BugHerd",
	website: "https://bugherd.com",
	description: "BugHerd is a cloud-based feedback collection and bug management tool.",
	icon: "BugHerd.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "bugherd:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.bugherd\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bugherd:jsGlobal:1",
			kind: "jsGlobal",
			property: "BugHerdConfig",
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
