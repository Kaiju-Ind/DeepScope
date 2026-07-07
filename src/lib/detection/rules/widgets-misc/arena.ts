import type { TechnologyDefinition } from '../../types';

export const arenaTechnologyDefinition = {
	id: "arena",
	name: "Arena",
	website: "https://arena.im",
	description: "Arena widget is an embeddable widget provided by the Arena platform, which allows users to embed live blogs directly on their website.",
	icon: "Arena.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "arena:dom:0",
			kind: "dom",
			selector: "iframe[src*='//go.arena.im/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "arena:jsGlobal:1",
			kind: "jsGlobal",
			property: "arenaHub.arenaIdentify",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "arena:jsGlobal:2",
			kind: "jsGlobal",
			property: "arenaLiveblog",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "arena:jsGlobal:3",
			kind: "jsGlobal",
			property: "arenaim.initializeLiveblog",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
