import type { TechnologyDefinition } from '../../types';

export const ptengineTechnologyDefinition = {
	id: "ptengine",
	name: "Ptengine",
	website: "https://www.ptengine.com",
	description: "Ptengine is a web analytics tool that offers heat mapping, session replays, and other insights to help businesses understand and optimize user behavior on their websites.",
	icon: "Ptengine.svg",
	categories: [
		"experimentation-optimization",
		"analytics",
	],
	rules: [
		{
			id: "ptengine:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.ptengine\\.(?:jp|cn|com)?\\/'"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ptengine:jsGlobal:1",
			kind: "jsGlobal",
			property: "ptengine",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
