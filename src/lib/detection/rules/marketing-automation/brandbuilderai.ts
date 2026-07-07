import type { TechnologyDefinition } from '../../types';

export const brandbuilderaiTechnologyDefinition = {
	id: "brandbuilderai",
	name: "BrandBuilderAI",
	website: "https://brandbuilderai.com",
	description: "BrandBuilderAI is an all-in-one system designed to automate marketing and lead generation processes.",
	icon: "BrandBuilderAI.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "brandbuilderai:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.brandbuilderai\\.com"),
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
