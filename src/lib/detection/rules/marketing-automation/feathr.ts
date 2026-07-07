import type { TechnologyDefinition } from '../../types';

export const feathrTechnologyDefinition = {
	id: "feathr",
	name: "Feathr",
	website: "https://www.feathr.co",
	description: "Feathr is a suite of digital marketing tools designed specifically for event organizers, facilitating targeted outreach and audience engagement.",
	icon: "Feathr.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "feathr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.feathr\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "feathr:jsGlobal:1",
			kind: "jsGlobal",
			property: "FeathrBoomerang.version",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
