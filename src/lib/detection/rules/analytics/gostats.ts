import type { TechnologyDefinition } from '../../types';

export const gostatsTechnologyDefinition = {
	id: "gostats",
	name: "GoStats",
	website: "https://gostats.com/",
	icon: "GoStats.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "gostats:jsGlobal:0",
			kind: "jsGlobal",
			property: "_goStatsRun",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gostats:jsGlobal:1",
			kind: "jsGlobal",
			property: "_go_track_src",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gostats:jsGlobal:2",
			kind: "jsGlobal",
			property: "go_msie",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
