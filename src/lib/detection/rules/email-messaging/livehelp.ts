import type { TechnologyDefinition } from '../../types';

export const livehelpTechnologyDefinition = {
	id: "livehelp",
	name: "LiveHelp",
	website: "https://www.livehelp.it",
	description: "LiveHelp is an online chat tool.",
	icon: "LiveHelp.png",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "livehelp:jsGlobal:0",
			kind: "jsGlobal",
			property: "LHready",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
		],
	},
} as const satisfies TechnologyDefinition;
