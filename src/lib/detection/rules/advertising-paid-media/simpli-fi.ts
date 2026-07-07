import type { TechnologyDefinition } from '../../types';

export const simpliFiTechnologyDefinition = {
	id: "simpli-fi",
	name: "Simpli.fi",
	website: "https://simpli.fi/",
	description: "Simpli.fi is a programmatic advertising and agency management software.",
	icon: "Simplifi.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "simpli-fi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.simpli\\.fi"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
