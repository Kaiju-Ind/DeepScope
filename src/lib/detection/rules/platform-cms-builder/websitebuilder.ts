import type { TechnologyDefinition } from '../../types';

export const websitebuilderTechnologyDefinition = {
	id: "websitebuilder",
	name: "WebsiteBuilder",
	website: "https://www.websitebuilder.com",
	description: "WebsiteBuilder is a page-builder for creating web pages without knowledge of programming languages.",
	icon: "WebsiteBuilder.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "websitebuilder:jsGlobal:0",
			kind: "jsGlobal",
			property: "_site.urls.dataproxy",
			valuePattern: new RegExp("\\.mywebsitebuilder\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "websitebuilder:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^[\\w\\s.&-]{0,40}\\bWebsite Builder$", "i"),
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
