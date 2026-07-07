import type { TechnologyDefinition } from '../../types';

export const unicornPlatformTechnologyDefinition = {
	id: "unicorn-platform",
	name: "Unicorn Platform",
	website: "https://unicornplatform.com",
	description: "Unicorn Platform is a drag and drop website and blog builder for startups, mobile apps, and SaaS.",
	icon: "Unicorn Platform.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "unicorn-platform:jsGlobal:0",
			kind: "jsGlobal",
			property: "unicornplatform",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
