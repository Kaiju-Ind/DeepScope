import type { TechnologyDefinition } from '../../types';

export const bluebarryTechnologyDefinition = {
	id: "bluebarry",
	name: "bluebarry",
	website: "https://bluebarry.ai",
	description: "bluebarry is a tool that helps increase customer retention by guiding shoppers to relevant products.",
	icon: "bluebarry.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "bluebarry:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("bluebarrycdn\\.blob\\.core"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "bluebarry:jsGlobal:1",
			kind: "jsGlobal",
			property: "barry.baseUrl",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
