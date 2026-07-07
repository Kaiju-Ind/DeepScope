import type { TechnologyDefinition } from '../../types';

export const cleancoreTechnologyDefinition = {
	id: "cleancore",
	name: "CleanCore",
	website: "https://cleancore.io",
	description: "CleanCore is an AI-driven CRM designed to automate operations for cleaning companies.",
	icon: "CleanCore.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "cleancore:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.cleancore\\.io"),
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
