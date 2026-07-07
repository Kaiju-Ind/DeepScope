import type { TechnologyDefinition } from '../../types';

export const easydigitaldownloadsTechnologyDefinition = {
	id: "easydigitaldownloads",
	name: "EasyDigitalDownloads",
	website: "https://easydigitaldownloads.com",
	description: "Easy Digital Downloads is a WordPress ecommerce plugin that focuses purely on digital products.",
	icon: "EasyDigitalDownloads.svg",
	categories: [
		"platform-cms-builder",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "easydigitaldownloads:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Easy Digital Downloads v(.*)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "easydigitaldownloads:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^easy digital downloads v(.*)$", "i"),
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
			"recurring",
		],
		cpe: "cpe:2.3:a:awesomemotive:easy_digital_downloads:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
