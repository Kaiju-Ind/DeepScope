import type { TechnologyDefinition } from '../../types';

export const vnnSportsTechnologyDefinition = {
	id: "vnn-sports",
	name: "VNN Sports",
	website: "https://www.vnnsports.net",
	description: "VNN Sports is a school sports marketing software that connects administrators, athletes, parents, fans, and brands around high school sports.",
	icon: "VNNSports.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "vnn-sports:jsGlobal:0",
			kind: "jsGlobal",
			property: "vnnEndpoints",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
