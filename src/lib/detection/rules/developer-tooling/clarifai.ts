import type { TechnologyDefinition } from '../../types';

export const clarifaiTechnologyDefinition = {
	id: "clarifai",
	name: "Clarifai",
	website: "https://www.clarifai.com",
	description: "Clarifai is a unified platform that enables creation and management of AI workloads while optimizing compute costs across preferred environments.",
	icon: "Clarifai.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "clarifai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.clarifai\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
