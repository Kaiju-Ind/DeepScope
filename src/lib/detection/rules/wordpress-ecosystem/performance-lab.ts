import type { TechnologyDefinition } from '../../types';

export const performanceLabTechnologyDefinition = {
	id: "performance-lab",
	name: "Performance Lab",
	website: "https://wordpress.org/plugins/performance-lab/",
	description: "Performance plugin from the WordPress Performance Group, which is a collection of standalone performance modules.",
	icon: "Performance Lab.svg",
	categories: [
		"wordpress-ecosystem",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "performance-lab:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Performance Lab ?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "performance-lab:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^(Performance Lab|performance-lab) ?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 2,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "performance-lab:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^(performance lab|performance-lab) ?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 2,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:wordpress:performance_lab:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
