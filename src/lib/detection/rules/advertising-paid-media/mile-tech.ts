import type { TechnologyDefinition } from '../../types';

export const mileTechTechnologyDefinition = {
	id: "mile-tech",
	name: "Mile.tech",
	website: "https://www.mile.tech",
	description: "Mile.tech is a digital media products company that provides a suite of programmatic monetisation solutions.",
	icon: "Mile.tech.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "mile-tech:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/go\\.automatad\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
