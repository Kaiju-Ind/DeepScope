import type { TechnologyDefinition } from '../../types';

export const adobeGoliveTechnologyDefinition = {
	id: "adobe-golive",
	name: "Adobe GoLive",
	website: "https://www.adobe.com/products/golive",
	description: "Adobe GoLive is a WYSIWYG HTML editor and web site management application.",
	icon: "Adobe GoLive.png",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "adobe-golive:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Adobe GoLive(?:\\s([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "adobe-golive:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("adobe golive(?:\\s([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:adobe:golive:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
