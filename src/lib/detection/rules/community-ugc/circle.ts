import type { TechnologyDefinition } from '../../types';

export const circleTechnologyDefinition = {
	id: "circle",
	name: "Circle",
	website: "https://circle.so",
	description: "Circie is an all-in-one community platform for businesses that brings together engaging courses, discussions, members, live streams, chat, events, and memberships.",
	icon: "Circle.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "circle:dom:0",
			kind: "dom",
			selector: "a[href*='.circle.so/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "circle:jsGlobal:1",
			kind: "jsGlobal",
			property: "circleUser",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "circle:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^_circle_session:$", "i"),
			confidence: 50,
			description: "Cookie name matches a known technology marker.",
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
