import type { TechnologyDefinition } from '../../types';

export const technology4partnersCmsTechnologyDefinition = {
	id: "4partners-cms",
	name: "4Partners CMS",
	website: "https://4partners.io/en/4p-cms",
	description: "4Partners CMS is a cloud-based solution designed for ecommerce shops.",
	icon: "4Partners.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "4partners-cms:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^4CMS$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "4partners-cms:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^4cms$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
	implies: [
		"4partners",
		"nginx",
		"php",
	],
} as const satisfies TechnologyDefinition;
