import type { TechnologyDefinition } from '../../types';

export const fullstoryTechnologyDefinition = {
	id: "fullstory",
	name: "FullStory",
	website: "https://www.fullstory.com",
	description: "FullStory is a web-based digital intelligence system that helps optimize the client experience.",
	icon: "FullStory.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "fullstory:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.fullstory\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fullstory:jsGlobal:1",
			kind: "jsGlobal",
			property: "FS.clearUserCookie",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
