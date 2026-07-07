import type { TechnologyDefinition } from '../../types';

export const vexTechnologyDefinition = {
	id: "vex",
	name: "Vex",
	website: "https://github.hubspot.com/vex",
	description: "Vex is a lightweight library for creating functional dialogs using vanilla JavaScript without external dependencies.",
	icon: "HubSpot.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "vex:jsGlobal:0",
			kind: "jsGlobal",
			property: "vex.close",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
