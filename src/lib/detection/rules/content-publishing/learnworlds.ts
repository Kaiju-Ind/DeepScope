import type { TechnologyDefinition } from '../../types';

export const learnworldsTechnologyDefinition = {
	id: "learnworlds",
	name: "LearnWorlds",
	website: "https://www.learnworlds.com",
	description: "LearnWorlds is a powerful yet lightweight, user-friendly, white-labeled cloud-based LMS ideal for versatile employee training.",
	icon: "LearnWorlds.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "learnworlds:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.mycourse\\.app\\/v([\\d\\.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "learnworlds:jsGlobal:1",
			kind: "jsGlobal",
			property: "LWClient.ebooks",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "learnworlds:jsGlobal:2",
			kind: "jsGlobal",
			property: "LWSettings.deactive_components",
			description: "Page-owned global matches a known technology marker.",
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
