import type { TechnologyDefinition } from '../../types';

export const rewixTechnologyDefinition = {
	id: "rewix",
	name: "Rewix",
	website: "https://www.rewixecommerce.com",
	description: "Rewix is a B2B ecommerce platform that offers flexible and secure solutions to increase sales through data-driven tools.",
	icon: "Rewix.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rewix:jsGlobal:0",
			kind: "jsGlobal",
			property: "Rewix.trackUpdateCart",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
