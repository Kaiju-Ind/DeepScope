import type { TechnologyDefinition } from '../../types';

export const freespeeTechnologyDefinition = {
	id: "freespee",
	name: "Freespee",
	website: "https://www.freespee.com",
	icon: "Freespee.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "freespee:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.freespee\\.com\\/js\\/external\\/fs\\.(?:min\\.)?js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
