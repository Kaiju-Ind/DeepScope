import type { TechnologyDefinition } from '../../types';

export const adinfinityTechnologyDefinition = {
	id: "adinfinity",
	name: "AdInfinity",
	website: "https://adinfinity.com.au",
	icon: "AdInfinity.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "adinfinity:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("adinfinity\\.com\\.au"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
