import type { TechnologyDefinition } from '../../types';

export const tapstreamTechnologyDefinition = {
	id: "tapstream",
	name: "Tapstream",
	website: "https://tapstream.com",
	description: "Tapstream is a mobile marketing platform that supports user acquisition and engagement for leading global applications.",
	icon: "Tapstream.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "tapstream:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.tapstream\\.com"),
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
