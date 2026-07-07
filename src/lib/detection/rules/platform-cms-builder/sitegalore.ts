import type { TechnologyDefinition } from '../../types';

export const sitegaloreTechnologyDefinition = {
	id: "sitegalore",
	name: "SiteGalore",
	website: "https://www.sitegalore.com",
	description: "SiteGalore is a white-label website builder that enables organizations to create, manage, and scale customizable websites through flexible components and deployment options.",
	icon: "SiteGalore.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sitegalore:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^SiteGalore$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "sitegalore:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^sitegalore$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
