import type { TechnologyDefinition } from '../../types';

export const keepeekTechnologyDefinition = {
	id: "keepeek",
	name: "Keepeek",
	website: "https://www.keepeek.com",
	description: "Keepeek is a digital asset management and photo library solutions provider.",
	icon: "Keepeek.svg",
	categories: [
		"content-publishing",
		"media-video",
	],
	rules: [
		{
			id: "keepeek:jsGlobal:0",
			kind: "jsGlobal",
			property: "keepeekScrollToName",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
