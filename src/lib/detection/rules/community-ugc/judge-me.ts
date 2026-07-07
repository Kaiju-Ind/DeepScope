import type { TechnologyDefinition } from '../../types';

export const judgeMeTechnologyDefinition = {
	id: "judge-me",
	name: "Judge.me",
	website: "https://judge.me",
	description: "Judge.me is a reviews app that helps you collect and display product reviews and site reviews with photos, videos and Q&A.",
	icon: "Judge.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "judge-me:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.judge\\.me"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "judge-me:jsGlobal:1",
			kind: "jsGlobal",
			property: "judgeme",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "judge-me:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\.judge\\.me"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "judge-me:jsGlobal:3",
			kind: "jsGlobal",
			property: "jdgm",
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
} as const satisfies TechnologyDefinition;
