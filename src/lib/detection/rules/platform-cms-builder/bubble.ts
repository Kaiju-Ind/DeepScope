import type { TechnologyDefinition } from '../../types';

export const bubbleTechnologyDefinition = {
	id: "bubble",
	name: "Bubble",
	website: "https://bubble.io",
	description: "Bubble is a no-code platform that lets anyone build web apps without writing any code.",
	icon: "bubble.png",
	categories: [
		"platform-cms-builder",
		"framework",
	],
	rules: [
		{
			id: "bubble:jsGlobal:0",
			kind: "jsGlobal",
			property: "_bubble_page_load_data",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bubble:jsGlobal:1",
			kind: "jsGlobal",
			property: "bubble_environment",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bubble:jsGlobal:2",
			kind: "jsGlobal",
			property: "bubble_hostname_modifier",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bubble:jsGlobal:3",
			kind: "jsGlobal",
			property: "bubble_version",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
