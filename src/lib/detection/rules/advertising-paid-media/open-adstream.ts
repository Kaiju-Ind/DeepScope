import type { TechnologyDefinition } from '../../types';

export const openAdstreamTechnologyDefinition = {
	id: "open-adstream",
	name: "Open AdStream",
	website: "https://www.xaxis.com",
	icon: "Open AdStream.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "open-adstream:jsGlobal:0",
			kind: "jsGlobal",
			property: "OAS_AD",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
