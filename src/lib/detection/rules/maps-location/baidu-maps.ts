import type { TechnologyDefinition } from '../../types';

export const baiduMapsTechnologyDefinition = {
	id: "baidu-maps",
	name: "Baidu Maps",
	website: "https://map.baidu.com",
	description: "Baidu Maps is a desktop and mobile web mapping service application and technology provided by Baidu, offering satellite imagery, street maps, street view and indoor view perspectives, as well as functions such as a route planner for traveling by foot, car, or with public transportation.",
	icon: "Baidu Maps.png",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "baidu-maps:jsGlobal:0",
			kind: "jsGlobal",
			property: "BMAP_API_VERSION",
			valuePattern: new RegExp("(.+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "baidu-maps:jsGlobal:1",
			kind: "jsGlobal",
			property: "bmap.version",
			valuePattern: new RegExp("(.+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
