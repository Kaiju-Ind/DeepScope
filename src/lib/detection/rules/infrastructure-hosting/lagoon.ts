import type { TechnologyDefinition } from '../../types';

export const lagoonTechnologyDefinition = {
	id: "lagoon",
	name: "Lagoon",
	website: "https://lagoon.sh/",
	description: "The Open Source Application Delivery Platform for Kubernetes.",
	icon: "lagoon.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
