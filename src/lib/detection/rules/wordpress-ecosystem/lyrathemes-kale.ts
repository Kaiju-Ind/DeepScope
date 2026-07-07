import type { TechnologyDefinition } from '../../types';

export const lyrathemesKaleTechnologyDefinition = {
	id: "lyrathemes-kale",
	name: "LyraThemes Kale",
	website: "https://www.lyrathemes.com/kale",
	description: "LyraThemes Kale is a charming and elegant, aesthetically minimal and uncluttered food blog WordPress theme.",
	icon: "LyraThemes.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "lyrathemes-kale:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/kale(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lyrathemes-kale:jsGlobal:1",
			kind: "jsGlobal",
			property: "kale_responsive_videos",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
