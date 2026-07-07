import type { TechnologyDefinition } from '../../types';

export const clevyTechnologyDefinition = {
	id: "clevy",
	name: "Clevy",
	website: "https://www.clevy.io",
	description: "Clevy is a platform that automates internal processes and queries within organizations, streamlining operations and improving efficiency.",
	icon: "Clevy.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "clevy:jsGlobal:0",
			kind: "jsGlobal",
			property: "clevyWidget.showIframe",
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
