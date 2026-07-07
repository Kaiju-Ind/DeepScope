import type { TechnologyDefinition } from '../../types';

export const mountainTechnologyDefinition = {
	id: "mountain",
	name: "Mountain",
	website: "https://mountain.com/",
	description: "MNTN Performance TV is a CTV advertising platform with targeting, measurement, and optimization for amplifying marketers' performance goals.",
	icon: "Mountain.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "mountain:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("dx\\.mountain\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mountain:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("px\\.mountain\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
