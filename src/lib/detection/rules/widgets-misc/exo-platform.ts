import type { TechnologyDefinition } from '../../types';

export const exoPlatformTechnologyDefinition = {
	id: "exo-platform",
	name: "Exo Platform",
	website: "https://www.exoplatform.com",
	description: "Exo Platform is a social-collaboration software designed for enterprises.",
	icon: "ExoPlatform.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "exo-platform:jsGlobal:0",
			kind: "jsGlobal",
			property: "eXo.core",
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
