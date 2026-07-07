import type { TechnologyDefinition } from '../../types';

export const zmagsCreatorTechnologyDefinition = {
	id: "zmags-creator",
	name: "Zmags Creator",
	website: "https://www.creatorbyzmags.com",
	description: "Zmags Creator enables marketers to design and publish endless types of interactive digital experiences without coding.",
	icon: "Zmags Creator.png",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "zmags-creator:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("c(?:reator)?\\.zmags\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zmags-creator:jsGlobal:1",
			kind: "jsGlobal",
			property: "__zmags",
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
