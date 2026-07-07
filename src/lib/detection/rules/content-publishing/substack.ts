import type { TechnologyDefinition } from '../../types';

export const substackTechnologyDefinition = {
	id: "substack",
	name: "Substack",
	website: "https://substack.com/",
	description: "Substack is an American online platform that provides publishing, payment, analytics, and design infrastructure to support subscription newsletters.",
	icon: "Substack.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "substack:header:0",
			kind: "header",
			key: "x-cluster",
			valuePattern: new RegExp("substack", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "substack:header:1",
			kind: "header",
			key: "x-served-by",
			valuePattern: new RegExp("Substack", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "substack:header:2",
			kind: "header",
			key: "x-served-by",
			valuePattern: new RegExp("substack", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
