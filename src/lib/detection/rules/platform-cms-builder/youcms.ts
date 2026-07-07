import type { TechnologyDefinition } from '../../types';

export const youcmsTechnologyDefinition = {
	id: "youcms",
	name: "youCMS",
	website: "https://www.youcms.eu",
	description: "youCMS is an enterprise content management system developed in Denmark, designed to support large-scale digital content organization and delivery.",
	icon: "youCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "youcms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^youCMS(?:\\b|\\s|\\s*-)", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "youcms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^youcms(?:\\b|\\s|\\s*-)", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
