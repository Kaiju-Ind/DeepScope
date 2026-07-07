import type { TechnologyDefinition } from '../../types';

export const imagePrioritizerTechnologyDefinition = {
	id: "image-prioritizer",
	name: "Image Prioritizer",
	website: "https://wordpress.org/plugins/image-prioritizer/",
	description: "Performance plugin from the WordPress Performance Team, which optimizes the loading of images which are the LCP (Largest Contentful Paint) element, including both img elements and elements with CSS background images.",
	icon: "image-prioritizer.svg",
	categories: [
		"wordpress-ecosystem",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "image-prioritizer:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^image-prioritizer ([\\d.]+)?", "i"),
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
