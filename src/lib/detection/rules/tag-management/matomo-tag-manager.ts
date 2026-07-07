import type { TechnologyDefinition } from '../../types';

export const matomoTagManagerTechnologyDefinition = {
	id: "matomo-tag-manager",
	name: "Matomo Tag Manager",
	website: "https://developer.matomo.org/guides/tagmanager/introduction",
	description: "Matomo Tag Manager manages tracking and marketing tags.",
	icon: "Matomo.svg",
	categories: [
		"tag-management",
	],
	rules: [
		{
			id: "matomo-tag-manager:jsGlobal:0",
			kind: "jsGlobal",
			property: "MatomoTagManager",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
