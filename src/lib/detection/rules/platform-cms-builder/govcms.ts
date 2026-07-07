import type { TechnologyDefinition } from '../../types';

export const govcmsTechnologyDefinition = {
	id: "govcms",
	name: "govCMS",
	website: "https://www.govcms.gov.au",
	icon: "govCMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "govcms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Drupal ([\\d]+) \\(http:\\/\\/drupal\\.org\\) \\+ govCMS", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "govcms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("drupal ([\\d]+) \\(http:\\/\\/drupal\\.org\\) \\+ govcms", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "govcms:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Drupal ([\\d]+) \\(https?:\\/\\/drupal\\.org\\) \\+ (?:GovCMS|govCMS)(?: \\(https?:\\/\\/(?:www\\.)?govcms\\.gov\\.au\\))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"drupal",
	],
} as const satisfies TechnologyDefinition;
