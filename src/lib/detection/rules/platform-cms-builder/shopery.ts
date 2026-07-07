import type { TechnologyDefinition } from '../../types';

export const shoperyTechnologyDefinition = {
	id: "shopery",
	name: "Shopery",
	website: "https://shopery.com",
	icon: "Shopery.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [],
	implies: [
		"elcodi",
		"php",
		"symfony",
	],
} as const satisfies TechnologyDefinition;
