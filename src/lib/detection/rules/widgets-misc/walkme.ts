import type { TechnologyDefinition } from '../../types';

export const walkmeTechnologyDefinition = {
	id: "walkme",
	name: "WalkMe",
	website: "https://www.walkme.com",
	description: "WalkMe is a cloud-based interactive guidance and engagement platform.",
	icon: "WalkMe.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "walkme:dom:0",
			kind: "dom",
			selector: "link[href*='.walkme.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "walkme:jsGlobal:1",
			kind: "jsGlobal",
			property: "WalkMeAPI",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "walkme:jsGlobal:2",
			kind: "jsGlobal",
			property: "_walkmeConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
