import type { TechnologyDefinition } from '../../types';

export const essentialAccessibilityTechnologyDefinition = {
	id: "essential-accessibility",
	name: "eSSENTIAL Accessibility",
	website: "https://www.essentialaccessibility.com",
	description: "eSSENTIAL Accessibility is a digital accessibility-as-a-service platform.",
	icon: "eSSENTIAL Accessibility.png",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "essential-accessibility:dom:0",
			kind: "dom",
			selector: " a[href*='.essentialaccessibility.com'] > img",
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
