import type { TechnologyDefinition } from '../../types';

export const visualsoftTechnologyDefinition = {
	id: "visualsoft",
	name: "Visualsoft",
	website: "https://www.visualsoft.co.uk/",
	description: "Visualsoft is an ecommerce agency that delivers web design, development and marketing services to online retailers.",
	icon: "Visualsoft.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "visualsoft:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^vscommerce$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "visualsoft:meta:1",
			kind: "meta",
			key: "vs_status_checker_version",
			valuePattern: new RegExp("\\d+", "i"),
			description: "Meta tag matches a known technology marker.",
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
