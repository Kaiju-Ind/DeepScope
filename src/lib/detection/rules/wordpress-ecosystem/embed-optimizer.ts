import type { TechnologyDefinition } from '../../types';

export const embedOptimizerTechnologyDefinition = {
	id: "embed-optimizer",
	name: "Embed Optimizer",
	website: "https://wordpress.org/plugins/embed-optimizer/",
	description: "Performance plugin from the WordPress Performance Team, which optimizes embeds by lazy loading them only as they come into view.",
	icon: "embed-optimizer.svg",
	categories: [
		"wordpress-ecosystem",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "embed-optimizer:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^embed-optimizer ([\\d.]+)?", "i"),
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
