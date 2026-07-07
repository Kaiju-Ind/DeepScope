import type { TechnologyDefinition } from '../../types';

export const ctawidgetTechnologyDefinition = {
	id: "ctawidget",
	name: "CTAwidget",
	website: "https://ctawidget.ru",
	description: "CTAwidget is a tool designed to increase website conversion through customizable widgets aimed at enhancing user engagement and optimizing conversion rates.",
	icon: "CTAwidget.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "ctawidget:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.ctawidget\\.ru"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ctawidget:jsGlobal:1",
			kind: "jsGlobal",
			property: "get_visible_cta",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
