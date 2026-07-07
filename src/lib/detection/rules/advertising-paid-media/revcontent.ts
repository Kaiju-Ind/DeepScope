import type { TechnologyDefinition } from '../../types';

export const revcontentTechnologyDefinition = {
	id: "revcontent",
	name: "RevContent",
	website: "https://www.revcontent.com",
	description: "RevContent is a monetization and recommendation engine that connects advertisers to highly engaged audiences on the web's leading publisher sites.",
	icon: "revcontent.png",
	categories: [
		"advertising-paid-media",
		"widgets-misc",
	],
	rules: [
		{
			id: "revcontent:dom:0",
			kind: "dom",
			selector: "link[href*='.revcontent.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "revcontent:jsGlobal:1",
			kind: "jsGlobal",
			property: "revcontent",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
