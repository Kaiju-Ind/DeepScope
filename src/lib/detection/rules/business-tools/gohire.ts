import type { TechnologyDefinition } from '../../types';

export const gohireTechnologyDefinition = {
	id: "gohire",
	name: "GoHire",
	website: "https://gohire.io",
	description: "GoHire is an AI-first hiring platform that uses AI-driven matching and automated workflows to streamline candidate sourcing, screening, and hiring processes.",
	icon: "GoHire.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "gohire:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.gohire\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gohire:jsGlobal:1",
			kind: "jsGlobal",
			property: "gohire",
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
