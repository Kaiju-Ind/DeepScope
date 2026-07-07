import type { TechnologyDefinition } from '../../types';

export const huddleTechnologyDefinition = {
	id: "huddle",
	name: "Huddle",
	website: "https://www.thehuddle.nl",
	description: "Huddle is a digital product agency based in Amsterdam, Netherlands, specialising in developing and designing custom software solutions for startups and enterprises, including e-learning products, community platforms, and mobile applications.",
	icon: "Huddle.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "huddle:dom:0",
			kind: "dom",
			selector: "link[href*='.thehuddle.nl/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "huddle:jsGlobal:1",
			kind: "jsGlobal",
			property: "HuddleEvent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "huddle:jsGlobal:2",
			kind: "jsGlobal",
			property: "HuddleUser",
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
