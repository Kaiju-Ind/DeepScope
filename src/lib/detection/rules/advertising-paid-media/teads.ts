import type { TechnologyDefinition } from '../../types';

export const teadsTechnologyDefinition = {
	id: "teads",
	name: "Teads",
	website: "https://www.teads.com",
	description: "Teads is a technology provider that sells ads on publisher websites.",
	icon: "Teads.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "teads:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("teads\\.tv"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "teads:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("\\.teads\\.tv"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
