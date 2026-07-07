import type { TechnologyDefinition } from '../../types';

export const systMeDeDesignDeLTatTechnologyDefinition = {
	id: "syst-me-de-design-de-l-tat",
	name: "Système de Design de l'État",
	website: "https://www.systeme-de-design.gouv.fr/",
	description: "Système de Design de l'État is a design system consisting of web components used by French government websites to build and maintain official user interfaces for.gouv.fr services.",
	icon: "StateDesignSystem.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "syst-me-de-design-de-l-tat:jsGlobal:0",
			kind: "jsGlobal",
			property: "dsfr.Modes",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
