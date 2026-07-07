import type { TechnologyDefinition } from '../../types';

export const elasticpressTechnologyDefinition = {
	id: "elasticpress",
	name: "ElasticPress",
	website: "https://www.elasticpress.io/",
	description: "ElasticPress is a hosting service that connects your WordPress site to search hosting.",
	icon: "elasticpress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
		cpe: "cpe:2.3:a:10up:elasticpress:*:*:*:*:*:wordpress:*:*",
	},
	implies: [
		"elasticsearch",
	],
} as const satisfies TechnologyDefinition;
