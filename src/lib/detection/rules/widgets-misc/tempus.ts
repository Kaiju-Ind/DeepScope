import type { TechnologyDefinition } from '../../types';

export const tempusTechnologyDefinition = {
	id: "tempus",
	name: "Tempus",
	website: "https://github.com/darkroomengineering/tempus",
	description: "Tempus is a lightweight animation frame manager for JavaScript applications, designed to optimize timing and control of visual updates.",
	icon: "Tempus.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "tempus:jsGlobal:0",
			kind: "jsGlobal",
			property: "tempusVersion",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
