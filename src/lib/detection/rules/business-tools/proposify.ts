import type { TechnologyDefinition } from '../../types';

export const proposifyTechnologyDefinition = {
	id: "proposify",
	name: "Proposify",
	website: "https://www.proposify.com",
	description: "Proposify is a proposal software that provides sales leaders with control and visibility over key stages of the sales process.",
	icon: "Proposify.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "proposify:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.proposify\\.com"),
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
