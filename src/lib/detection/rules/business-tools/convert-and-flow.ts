import type { TechnologyDefinition } from '../../types';

export const convertAndFlowTechnologyDefinition = {
	id: "convert-and-flow",
	name: "Convert and Flow",
	website: "https://convertandflow.com",
	description: "Convert and Flow is a customer relationship management tool designed to manage customer relationships and enhance customer satisfaction.",
	icon: "ConvertAndFlow.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "convert-and-flow:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.convertandflow\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
