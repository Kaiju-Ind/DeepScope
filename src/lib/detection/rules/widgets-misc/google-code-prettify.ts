import type { TechnologyDefinition } from '../../types';

export const googleCodePrettifyTechnologyDefinition = {
	id: "google-code-prettify",
	name: "Google Code Prettify",
	website: "https://code.google.com/p/google-code-prettify",
	icon: "Google.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "google-code-prettify:jsGlobal:0",
			kind: "jsGlobal",
			property: "prettyPrint",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
