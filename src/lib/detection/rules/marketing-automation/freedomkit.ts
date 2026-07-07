import type { TechnologyDefinition } from '../../types';

export const freedomkitTechnologyDefinition = {
	id: "freedomkit",
	name: "FreedomKit",
	website: "https://freedomkit.ai",
	description: "FreedomKit is an all-in-one online business software powered by AI that supports automation to streamline operations.",
	icon: "FreedomKit.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "freedomkit:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.freedomkit\\.ai"),
			description: "Script content contains a bounded technology signature.",
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
