import type { TechnologyDefinition } from '../../types';

export const cliparaTechnologyDefinition = {
	id: "clipara",
	name: "Clipara",
	website: "https://www.getclipara.com",
	description: "Clipara is a platform that helps businesses connect with customers using video by adding video content to websites, emails, and SMS without coding.",
	icon: "Clipara.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "clipara:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getclipara\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "clipara:jsGlobal:1",
			kind: "jsGlobal",
			property: "__clipara",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clipara:jsGlobal:2",
			kind: "jsGlobal",
			property: "cliparaCurrentUrl",
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
