import type { TechnologyDefinition } from '../../types';

export const btoleadTechnologyDefinition = {
	id: "btolead",
	name: "BTOLEAD",
	website: "https://btolead.it",
	description: "BTOLEAD is B2B lead generation software that enables businesses to identify and connect with potential customers.",
	icon: "BTOLEAD.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "btolead:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("track\\.btolead\\.it"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
