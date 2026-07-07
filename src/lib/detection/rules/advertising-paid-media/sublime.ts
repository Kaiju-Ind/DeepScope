import type { TechnologyDefinition } from '../../types';

export const sublimeTechnologyDefinition = {
	id: "sublime",
	name: "Sublime",
	website: "https://www.sublime.xyz",
	description: "Sublime (formerly Sublime Skinz) operator of an advertising agency intended to offer skin-based advertising services to clients.",
	icon: "Sublime.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "sublime:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ayads\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sublime:jsGlobal:1",
			kind: "jsGlobal",
			property: "loadSublimeSkinz",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
