import type { TechnologyDefinition } from '../../types';

export const rackcacheTechnologyDefinition = {
	id: "rackcache",
	name: "RackCache",
	website: "https://github.com/rtomayko/rack-cache",
	description: "RackCache is a quick drop-in component to enable HTTP caching for Rack-based applications.",
	icon: "RackCache.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [],
	implies: [
		"ruby",
	],
} as const satisfies TechnologyDefinition;
