import type { TechnologyDefinition } from '../../types';

export const stratticTechnologyDefinition = {
	id: "strattic",
	name: "Strattic",
	website: "https://www.strattic.com/",
	description: "Strattic offers static and headless hosting for WordPress sites.",
	icon: "strattic-icon.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "strattic:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("Strattic", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "strattic:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("strattic", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
