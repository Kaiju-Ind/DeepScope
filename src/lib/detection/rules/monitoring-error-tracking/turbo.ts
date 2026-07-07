import type { TechnologyDefinition } from '../../types';

export const turboTechnologyDefinition = {
	id: "turbo",
	name: "Turbo",
	website: "https://turbo.hotwired.dev/",
	description: "Turbo is a JavaScript framework for building fast web applications.",
	icon: "Turbo.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "turbo:jsGlobal:0",
			kind: "jsGlobal",
			property: "Turbo",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
