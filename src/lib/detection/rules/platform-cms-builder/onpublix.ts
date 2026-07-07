import type { TechnologyDefinition } from '../../types';

export const onpublixTechnologyDefinition = {
	id: "onpublix",
	name: "onpublix",
	website: "https://www.onpublix.de",
	description: "onpublix is a web content management system (CMS) platform for eBusinesses.",
	icon: "onpublix.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "onpublix:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^onpublix\\s([\\d\\.]+)$", "i"),
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
			"mid",
			"onetime",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
