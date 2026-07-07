import type { TechnologyDefinition } from '../../types';

export const websiteX5TechnologyDefinition = {
	id: "website-x5",
	name: "WebSite X5",
	website: "https://websitex5.com",
	description: "WebSite X5 is a tools to create and publish websites.",
	icon: "WebSite X5.png",
	categories: [
		"rich-text-editors",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "website-x5:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Incomedia WebSite X5 (\\w+ [\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "website-x5:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("incomedia website x5 (\\w+ [\\d.]+)", "i"),
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
