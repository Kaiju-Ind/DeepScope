import type { TechnologyDefinition } from '../../types';

export const pieeyeTechnologyDefinition = {
	id: "pieeye",
	name: "PieEye",
	website: "https://pii.ai",
	description: "PieEye is a data privacy solution for ecommerce platforms that supports privacy compliance requirements.",
	icon: "PieEye.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "pieeye:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cookie\\.pii\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pieeye:jsGlobal:1",
			kind: "jsGlobal",
			property: "piEyeScript",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
