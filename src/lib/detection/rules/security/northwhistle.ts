import type { TechnologyDefinition } from '../../types';

export const northwhistleTechnologyDefinition = {
	id: "northwhistle",
	name: "NorthWhistle",
	website: "https://www.northwhistle.com",
	description: "NorthWhistle is a whistleblowing system that enables organizations to deploy compliant reporting websites through plug-and-play functionality.",
	icon: "NorthWhistle.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "northwhistle:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.northwhistle\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
