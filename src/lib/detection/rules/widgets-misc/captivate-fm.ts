import type { TechnologyDefinition } from '../../types';

export const captivateFmTechnologyDefinition = {
	id: "captivate-fm",
	name: "Captivate.fm",
	website: "https://www.captivate.fm",
	description: "Captivate.fm is a podcast hosting and analytics platform that provides tools for creating, hosting, and distributing podcasts.",
	icon: "Captivate.fm.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "captivate-fm:dom:0",
			kind: "dom",
			selector: "iframe[src*='player.captivate.fm/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "captivate-fm:jsGlobal:1",
			kind: "jsGlobal",
			property: "CAPTIVATE_PLAYER_APP_URL",
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
