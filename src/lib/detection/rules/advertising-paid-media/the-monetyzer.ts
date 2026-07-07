import type { TechnologyDefinition } from '../../types';

export const theMonetyzerTechnologyDefinition = {
	id: "the-monetyzer",
	name: "The Monetyzer",
	website: "https://www.themoneytizer.com",
	description: "The Monetyzer is a global advertising platform for publishers.",
	icon: "TheMonetyzer.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "the-monetyzer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.themoneytizer\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
