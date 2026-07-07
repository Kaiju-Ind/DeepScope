import type { TechnologyDefinition } from '../../types';

export const upvotyTechnologyDefinition = {
	id: "upvoty",
	name: "Upvoty",
	website: "https://upvoty.com",
	description: "Upvoty is a platform for collecting and managing user feedback and feature requests.",
	icon: "upvoty.png",
	categories: [
		"developer-tooling",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "upvoty:dom:0",
			kind: "dom",
			selector: "div.upvotyContainer",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "upvoty:jsGlobal:1",
			kind: "jsGlobal",
			property: "upvoty",
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
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
