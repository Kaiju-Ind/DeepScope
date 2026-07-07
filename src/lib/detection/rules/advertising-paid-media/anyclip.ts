import type { TechnologyDefinition } from '../../types';

export const anyclipTechnologyDefinition = {
	id: "anyclip",
	name: "AnyClip",
	website: "https://www.anyclip.com",
	description: "AnyClip is a video engagement platform that uses an AI-driven content analysis engine to analyze and categorize video content in real-time to create personalised video feeds.",
	icon: "AnyClip.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "anyclip:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.anyclip\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "anyclip:dom:1",
			kind: "dom",
			selector: "img[src*='.anyclip.com'], video[poster*='.anyclip.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "anyclip:jsGlobal:2",
			kind: "jsGlobal",
			property: "anyclip",
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
