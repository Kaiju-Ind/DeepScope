import type { TechnologyDefinition } from '../../types';

export const formwiseTechnologyDefinition = {
	id: "formwise",
	name: "FormWise",
	website: "https://www.formwise.ai",
	description: "FormWise is a platform that enables the creation of white-label AI tools using ChatGPT prompts for customizable applications across industries.",
	icon: "FormWise.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "formwise:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.formwise\\.ai"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
