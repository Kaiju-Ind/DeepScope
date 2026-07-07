import type { TechnologyDefinition } from '../../types';

export const optimizationDetectiveTechnologyDefinition = {
	id: "optimization-detective",
	name: "Optimization Detective",
	website: "https://wordpress.org/plugins/optimization-detective/",
	description: "Performance plugin from the WordPress Performance Team, which captures real user metrics about what elements are displayed on the page across a variety of device form factors (e.g. desktop, tablet, and phone) in order to apply loading optimizations.",
	icon: "optimization-detective.svg",
	categories: [
		"wordpress-ecosystem",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "optimization-detective:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^optimization-detective ([\\d.]+)?", "i"),
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
