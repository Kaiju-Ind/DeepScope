import type { TechnologyDefinition } from '../../types';

export const clubcastTechnologyDefinition = {
	id: "clubcast",
	name: "Clubcast",
	website: "https://clubcast.co.uk",
	description: "Clubcast is a platform for managing and personalizing content for digital products, designed to enhance fan experiences and support revenue growth.",
	icon: "Clubcast.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "clubcast:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.clubcast\\.co\\.uk"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "clubcast:jsGlobal:1",
			kind: "jsGlobal",
			property: "ClubcastRegistry",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clubcast:jsGlobal:2",
			kind: "jsGlobal",
			property: "webpackChunkclubcast",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
