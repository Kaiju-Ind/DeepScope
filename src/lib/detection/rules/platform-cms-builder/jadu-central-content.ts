import type { TechnologyDefinition } from '../../types';

export const jaduCentralContentTechnologyDefinition = {
	id: "jadu-central-content",
	name: "Jadu Central Content",
	website: "https://www.jadu.net/cms",
	description: "Jadu Central Content is a low-code publishing tool for creating, publishing, and managing website content and digital assets.",
	icon: "JaduCentralContent.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "jadu-central-content:meta:0",
			kind: "meta",
			key: "Author-Template",
			valuePattern: new RegExp("^Jadu CSS design$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "jadu-central-content:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("www\\.jadu\\.net", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "jadu-central-content:meta:2",
			kind: "meta",
			key: "author-template",
			valuePattern: new RegExp("^jadu css design$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
