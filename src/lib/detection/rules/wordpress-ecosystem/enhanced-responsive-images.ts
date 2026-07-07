import type { TechnologyDefinition } from '../../types';

export const enhancedResponsiveImagesTechnologyDefinition = {
	id: "enhanced-responsive-images",
	name: "Enhanced Responsive Images",
	website: "https://wordpress.org/plugins/auto-sizes/",
	description: "Performance plugin from the WordPress Performance Team, which improves image sizes attribute accuracy and implements the HTML spec for adding sizes='auto' to lazy loaded images.",
	icon: "enhanced-image-sizes.svg",
	categories: [
		"wordpress-ecosystem",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "enhanced-responsive-images:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^auto-sizes ([\\d.]+)?", "i"),
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
