import type { TechnologyDefinition } from '../../types';

export const coasterCmsTechnologyDefinition = {
	id: "coaster-cms",
	name: "Coaster CMS",
	website: "https://www.coastercms.org",
	icon: "coaster-cms.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "coaster-cms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Coaster CMS v([\\d.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "coaster-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^coaster cms v([\\d.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:web-feet:coaster_cms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"laravel",
	],
} as const satisfies TechnologyDefinition;
