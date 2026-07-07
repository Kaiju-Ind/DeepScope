import type { TechnologyDefinition } from '../../types';

export const upstackDataTechnologyDefinition = {
	id: "upstack-data",
	name: "Upstack Data",
	website: "https://www.upstackdata.com",
	description: "Upstack Data is a toolkit for data-driven marketing that includes multi-touch attribution, advanced C-API integration, and identity resolution capabilities.",
	icon: "UpstackData.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "upstack-data:jsGlobal:0",
			kind: "jsGlobal",
			property: "_upstack",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
