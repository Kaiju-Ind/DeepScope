import type { TechnologyDefinition } from '../../types';

export const wolframalphaTechnologyDefinition = {
	id: "wolframalpha",
	name: "WolframAlpha",
	website: "https://www.wolframalpha.com/widgets",
	description: "WolframAlpha is a tool that integrates live computational knowledge into blogs or websites.",
	icon: "WolframAlpha.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "wolframalpha:jsGlobal:0",
			kind: "jsGlobal",
			property: "WolframAlphaWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
