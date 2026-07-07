import type { TechnologyDefinition } from '../../types';

export const doubanTechnologyDefinition = {
	id: "douban",
	name: "Douban",
	website: "https://m.douban.com",
	description: "Douban is a Chinese social sharing service for recording books, movies, and music.",
	icon: "Douban.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "douban:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("movie\\.douban\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "douban:jsGlobal:1",
			kind: "jsGlobal",
			property: "doubanmovie",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
