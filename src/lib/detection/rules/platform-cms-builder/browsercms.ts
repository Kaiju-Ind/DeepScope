import type { TechnologyDefinition } from '../../types';

export const browsercmsTechnologyDefinition = {
	id: "browsercms",
	name: "BrowserCMS",
	website: "https://browsercms.org",
	icon: "BrowserCMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "browsercms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("BrowserCMS ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "browsercms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("browsercms ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"ruby",
	],
} as const satisfies TechnologyDefinition;
