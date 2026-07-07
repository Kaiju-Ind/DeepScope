import type { TechnologyDefinition } from '../../types';

export const contentboxTechnologyDefinition = {
	id: "contentbox",
	name: "ContentBox",
	website: "https://www.gocontentbox.org",
	description: "ContentBox is an open-source CMS and modular content platform built on ColdBox.",
	icon: "ContentBox.png",
	categories: [
		"platform-cms-builder",
		"content-publishing",
	],
	rules: [
		{
			id: "contentbox:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("ContentBox powered by ColdBox", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "contentbox:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("contentbox powered by coldbox", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"adobe-coldfusion",
	],
} as const satisfies TechnologyDefinition;
