import type { TechnologyDefinition } from '../../types';

export const imperiaCmsTechnologyDefinition = {
	id: "imperia-cms",
	name: "imperia CMS",
	website: "https://www.pirobase-imperia.com/de/solutions/imperia-cms",
	description: "imperia CMS is a headless content management for large editorial.",
	icon: "imperiaCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "imperia-cms:dom:0",
			kind: "dom",
			selector: "source[srcset*='.de/imperia/md/images/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "imperia-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^IMPERIA\\s([\\d\\.\\_]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "imperia-cms:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^imperia\\s([\\d\\.\\_]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"perl",
	],
} as const satisfies TechnologyDefinition;
