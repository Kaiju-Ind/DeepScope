import type { TechnologyDefinition } from '../../types';

export const stackcommerceTechnologyDefinition = {
	id: "stackcommerce",
	name: "StackCommerce",
	website: "https://www.stackcommerce.com/",
	description: "StackCommerce is a product discovery platform.",
	icon: "Stackcommerce.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "stackcommerce:jsGlobal:0",
			kind: "jsGlobal",
			property: "stackSonar",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
