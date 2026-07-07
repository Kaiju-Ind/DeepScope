import type { TechnologyDefinition } from '../../types';

export const segmetricsTechnologyDefinition = {
	id: "segmetrics",
	name: "Segmetrics",
	website: "https://segmetrics.io",
	description: "Segmetrics is a platform that provides audience insights for marketers by analyzing customer data to understand behavior, segmentation, and performance across marketing channels.",
	icon: "Segmetrics.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "segmetrics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.segmetrics\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "segmetrics:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.segmetrics\\.io"),
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
