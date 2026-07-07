import type { TechnologyDefinition } from '../../types';

export const kaisaTechnologyDefinition = {
	id: "kaisa",
	name: "Kaisa",
	website: "https://www.kaisa.io",
	description: "Kaisa is a platform that leverages data to maintain buyer and seller engagement through personalised customer experiences on a large scale.",
	icon: "Kaisa.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "kaisa:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.freespee\\.com\\/js\\/external\\/fs\\.(?:min\\.)?js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
