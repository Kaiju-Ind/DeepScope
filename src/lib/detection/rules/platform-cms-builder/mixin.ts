import type { TechnologyDefinition } from '../../types';

export const mixinTechnologyDefinition = {
	id: "mixin",
	name: "Mixin",
	website: "https://mixin.ir",
	description: "Mixin is a highly-available ecommerce cloud.",
	icon: "Mixin.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
