import type { TechnologyDefinition } from '../../types';

export const zohoSitesTechnologyDefinition = {
	id: "zoho-sites",
	name: "Zoho Sites",
	website: "https://www.zoho.com/sites/",
	description: "Zoho Sites is an all-in-one platform designed to help businesses create websites.",
	icon: "Zoho.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zoho-sites:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Zoho Sites ([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "zoho-sites:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^zoho sites ([\\d\\.]+)", "i"),
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
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
