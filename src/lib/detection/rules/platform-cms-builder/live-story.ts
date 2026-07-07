import type { TechnologyDefinition } from '../../types';

export const liveStoryTechnologyDefinition = {
	id: "live-story",
	name: "Live Story",
	website: "https://www.livestory.nyc/",
	description: "Live Story is a platform designed for creating interactive, visual stories and presentations, offering tools for integrating multimedia content and data to build engaging narratives for professional use.",
	icon: "LiveStory.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "live-story:jsGlobal:0",
			kind: "jsGlobal",
			property: "LSHelpers",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "live-story:jsGlobal:1",
			kind: "jsGlobal",
			property: "LiveStory",
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
