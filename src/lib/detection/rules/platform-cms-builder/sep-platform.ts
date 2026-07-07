import type { TechnologyDefinition } from '../../types';

export const sepPlatformTechnologyDefinition = {
	id: "sep-platform",
	name: "SEP Platform",
	website: "https://www.sepplatform.com",
	description: "SEP Platform is an online store system designed to support ecommerce operations.",
	icon: "SEPPlatform.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sep-platform:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.sep\\.th"),
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
