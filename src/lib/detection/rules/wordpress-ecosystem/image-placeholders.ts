import type { TechnologyDefinition } from '../../types';

export const imagePlaceholdersTechnologyDefinition = {
	id: "image-placeholders",
	name: "Image Placeholders",
	website: "https://wordpress.org/plugins/dominant-color-images/",
	description: "Performance plugin from the WordPress Performance Team, which determines and stores the dominant color for newly uploaded images in the media library, then uses that as a placeholder background during front end image loads.",
	icon: "dominant-color-images.svg",
	categories: [
		"wordpress-ecosystem",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "image-placeholders:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^dominant-color-images ([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
