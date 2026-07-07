import type { TechnologyDefinition } from '../../types';

export const appyPieBuilderTechnologyDefinition = {
	id: "appy-pie-builder",
	name: "Appy Pie Builder",
	website: "https://www.appypie.com",
	description: "Appypie is a platform that enables the creation of apps and websites using AI.",
	icon: "Appypie.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "appy-pie-builder:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("snappy\\.appypie\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
