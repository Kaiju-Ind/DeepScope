import type { TechnologyDefinition } from '../../types';

export const fasterizeTechnologyDefinition = {
	id: "fasterize",
	name: "Fasterize",
	website: "https://www.fasterize.com/",
	description: "Fasterize is a website accelerator service.",
	icon: "Fasterize.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "fasterize:jsGlobal:0",
			kind: "jsGlobal",
			property: "fstrz",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
