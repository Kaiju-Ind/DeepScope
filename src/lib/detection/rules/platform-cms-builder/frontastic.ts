import type { TechnologyDefinition } from '../../types';

export const frontasticTechnologyDefinition = {
	id: "frontastic",
	name: "Frontastic",
	website: "https://www.frontastic.cloud/",
	description: "Frontastic is a Commerce Frontend Platform that unites business and development teams to build commerce sites on headless.",
	icon: "Frontastic.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
