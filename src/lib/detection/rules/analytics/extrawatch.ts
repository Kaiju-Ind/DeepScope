import type { TechnologyDefinition } from '../../types';

export const extrawatchTechnologyDefinition = {
	id: "extrawatch",
	name: "ExtraWatch",
	website: "https://www.extrawatch.com",
	description: "ExtraWatch is a tool that tracks clicks and helps optimize landing pages by providing actionable insights into user interactions.",
	icon: "ExtraWatch.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "extrawatch:jsGlobal:0",
			kind: "jsGlobal",
			property: "extraWatchAjaxLink",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "extrawatch:jsGlobal:1",
			kind: "jsGlobal",
			property: "extrawatch_createRequestObject",
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
