import type { TechnologyDefinition } from '../../types';

export const modernImageFormatsTechnologyDefinition = {
	id: "modern-image-formats",
	name: "Modern Image Formats",
	website: "https://wordpress.org/plugins/webp-uploads/",
	description: "Performance plugin from the WordPress Performance Team, which adds support for outputting images in WebP or AVIF format and supports the `picture` element to enable format fallbacks.",
	icon: "modern-image-formats.svg",
	categories: [
		"wordpress-ecosystem",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "modern-image-formats:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^webp-uploads ([\\d.]+)?", "i"),
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
