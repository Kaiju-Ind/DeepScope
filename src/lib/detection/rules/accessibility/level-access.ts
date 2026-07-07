import type { TechnologyDefinition } from '../../types';

export const levelAccessTechnologyDefinition = {
	id: "level-access",
	name: "Level Access",
	website: "https://www.levelaccess.com",
	description: "Level Access, formerly eSSENTIAL Accessibility, is a leading digital accessibility solutions provider offering tools and services to ensure compliance with standards such as ADA, Section 508, and WCAG​",
	icon: "Level Access.svg",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "level-access:dom:0",
			kind: "dom",
			selector: " a[href*='.essentialaccessibility.com'] > img, a[href*='.levelaccess.com'] > img",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
