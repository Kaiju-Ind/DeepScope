import type { TechnologyDefinition } from '../../types';

export const pineappleBuilderTechnologyDefinition = {
	id: "pineapple-builder",
	name: "Pineapple Builder",
	website: "https://www.pineapplebuilder.com",
	description: "Pineapple Builder is an AI-powered website builder designed to help businesses create and scale websites.",
	icon: "PineappleBuilder.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pineapple-builder:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.pineapple-cdn\\.com"),
			description: "Script content contains a bounded technology signature.",
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
