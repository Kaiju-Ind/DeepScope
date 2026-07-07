import type { TechnologyDefinition } from '../../types';

export const printlaneTechnologyDefinition = {
	id: "printlane",
	name: "Printlane",
	website: "https://printlane.com",
	description: "Printlane is a digital platform offering an interactive product customizer tool that enables real-time visualization and personalization of designs before production.",
	icon: "Printlane.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "printlane:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("designer\\.printlane\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "printlane:jsGlobal:1",
			kind: "jsGlobal",
			property: "printlane.init",
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
