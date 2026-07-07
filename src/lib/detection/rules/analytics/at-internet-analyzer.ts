import type { TechnologyDefinition } from '../../types';

export const atInternetAnalyzerTechnologyDefinition = {
	id: "at-internet-analyzer",
	name: "AT Internet Analyzer",
	website: "https://atinternet.com/en",
	icon: "AT Internet.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "at-internet-analyzer:jsGlobal:0",
			kind: "jsGlobal",
			property: "ATInternet",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "at-internet-analyzer:jsGlobal:1",
			kind: "jsGlobal",
			property: "xtsite",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
