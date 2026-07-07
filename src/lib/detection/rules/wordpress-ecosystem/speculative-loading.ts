import type { TechnologyDefinition } from '../../types';

export const speculativeLoadingTechnologyDefinition = {
	id: "speculative-loading",
	name: "Speculative Loading",
	website: "https://wordpress.org/plugins/speculation-rules/",
	description: "Performance plugin from the WordPress Performance Team, which adds support for the Speculation Rules API, by which certain URLs are dynamically prefetched or prerendered based on user interaction.",
	icon: "speculation-rules.svg",
	categories: [
		"wordpress-ecosystem",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "speculative-loading:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^speculation-rules ([\\d.]+)?", "i"),
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
