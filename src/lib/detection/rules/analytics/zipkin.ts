import type { TechnologyDefinition } from '../../types';

export const zipkinTechnologyDefinition = {
	id: "zipkin",
	name: "Zipkin",
	website: "https://zipkin.io/",
	icon: "Zipkin.png",
	categories: [
		"analytics",
	],
	rules: [],
} as const satisfies TechnologyDefinition;
