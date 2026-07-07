import type { TechnologyDefinition } from '../../types';

export const castleTechnologyDefinition = {
	id: "castle",
	name: "Castle",
	website: "https://castle.io",
	description: "Castle is a tool that offers deep visibility into user activities on your website, allowing you to monitor and understand user behaviour in real-time.",
	icon: "Castle.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "castle:dom:0",
			kind: "dom",
			selector: "link[href*='t.castle.io']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "castle:jsGlobal:1",
			kind: "jsGlobal",
			property: "_castle",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
