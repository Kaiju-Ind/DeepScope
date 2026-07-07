import type { TechnologyDefinition } from '../../types';

export const automatadTechnologyDefinition = {
	id: "automatad",
	name: "Automatad",
	website: "https://automatad.com/",
	description: "Automatad is a digital media products company that provides a suite of programmatic monetisation solutions.",
	icon: "automatad.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "automatad:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/go\\.automatad\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
