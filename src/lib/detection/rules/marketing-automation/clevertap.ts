import type { TechnologyDefinition } from '../../types';

export const clevertapTechnologyDefinition = {
	id: "clevertap",
	name: "CleverTap",
	website: "https://clevertap.com",
	description: "CleverTap is a SaaS based customer lifecycle management and mobile marketing company headquartered in Mountain View, California.",
	icon: "CleverTap.png",
	categories: [
		"marketing-automation",
		"analytics",
	],
	rules: [
		{
			id: "clevertap:jsGlobal:0",
			kind: "jsGlobal",
			property: "clevertap",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
