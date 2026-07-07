import type { TechnologyDefinition } from '../../types';

export const springTechnologyDefinition = {
	id: "spring",
	name: "Spring",
	website: "https://spring.io/",
	description: "Spring is a comprehensive framework for building enterprise-level Java applications, providing tools and infrastructure for application development, including dependency injection, transaction management, and integration with various technologies.",
	icon: "Spring.png",
	categories: [
		"framework",
	],
	rules: [],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:vmware:spring_framework:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
