import type { TechnologyDefinition } from '../../types';

export const milestoneCmsTechnologyDefinition = {
	id: "milestone-cms",
	name: "Milestone CMS",
	website: "https://www.milestoneinternet.com/products/milestone-cms",
	description: "Milestone CMS is a SEO-first CMS that offers built-in advanced schema markups and Core Web Vitals conformance for improved search performance.",
	icon: "Milestone.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "milestone-cms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Milestone\\sCMS\\s([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "milestone-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^milestone\\scms\\s([\\d\\.]+)$", "i"),
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
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
