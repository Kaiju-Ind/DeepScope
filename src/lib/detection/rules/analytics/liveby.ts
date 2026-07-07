import type { TechnologyDefinition } from '../../types';

export const livebyTechnologyDefinition = {
	id: "liveby",
	name: "LiveBy",
	website: "https://liveby.com",
	description: "LiveBy is a home discovery system designed to provide users with detailed insights into properties, neighborhoods, and local amenities, enabling informed decision-making when selecting a new residence.",
	icon: "LiveBy.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "liveby:jsGlobal:0",
			kind: "jsGlobal",
			property: "liveby.autoInitialize",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
