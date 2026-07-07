import type { TechnologyDefinition } from '../../types';

export const webWorkerOffloadingTechnologyDefinition = {
	id: "web-worker-offloading",
	name: "Web Worker Offloading",
	website: "https://wordpress.org/plugins/web-worker-offloading/",
	description: "Performance plugin from the WordPress Performance Team, which offloads JavaScript execution to a Web Worker, improving performance by freeing up the main thread.",
	icon: "web-worker-offloading.svg",
	categories: [
		"wordpress-ecosystem",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "web-worker-offloading:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^web-worker-offloading ([\\d.]+)?", "i"),
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
