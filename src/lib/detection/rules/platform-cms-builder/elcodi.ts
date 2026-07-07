import type { TechnologyDefinition } from '../../types';

export const elcodiTechnologyDefinition = {
	id: "elcodi",
	name: "Elcodi",
	website: "https://elcodi.io",
	icon: "Elcodi.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [],
	implies: [
		"php",
		"symfony",
	],
} as const satisfies TechnologyDefinition;
