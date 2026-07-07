import type { TechnologyDefinition } from '../../types';

export const umaiTechnologyDefinition = {
	id: "umai",
	name: "UMAI",
	website: "https://www.umai.io",
	description: "UMAI is an analytics-based software using state-of-the-art technology to improve the experiences & performance for hospitality based businesses and their guests.",
	icon: "UMAI.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "umai:jsGlobal:0",
			kind: "jsGlobal",
			property: "umaiWidget.config",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
