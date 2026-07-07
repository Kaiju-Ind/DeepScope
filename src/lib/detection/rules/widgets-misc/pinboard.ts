import type { TechnologyDefinition } from '../../types';

export const pinboardTechnologyDefinition = {
	id: "pinboard",
	name: "Pinboard",
	website: "https://pinboard.in",
	description: "Pinboard is a widget that displays bookmarks directly on a website for easy access and organization.",
	icon: "Pinboard.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "pinboard:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("feeds\\.pinboard\\.in"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pinboard:jsGlobal:1",
			kind: "jsGlobal",
			property: "Pinboard_Linkroll",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pinboard:jsGlobal:2",
			kind: "jsGlobal",
			property: "pinboardNS_callback",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
