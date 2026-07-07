import type { TechnologyDefinition } from '../../types';

export const rightjsTechnologyDefinition = {
	id: "rightjs",
	name: "RightJS",
	website: "https://github.com/rightjs",
	description: "RightJS is a modular JavaScript framework.",
	icon: "RightJS.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "rightjs:jsGlobal:0",
			kind: "jsGlobal",
			property: "RightJS",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
