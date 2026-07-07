import type { TechnologyDefinition } from '../../types';

export const rumbleTechnologyDefinition = {
	id: "rumble",
	name: "Rumble",
	website: "https://rumble.com",
	description: "Rumble is a Canadian video-streaming platform that presents itself as an alternative to YouTube.",
	icon: "Rumble.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "rumble:dom:0",
			kind: "dom",
			selector: "iframe[src*='//rumble.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "rumble:jsGlobal:1",
			kind: "jsGlobal",
			property: "Rumble.gdpr",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "rumble:jsGlobal:2",
			kind: "jsGlobal",
			property: "Rumble.resize",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
