import type { TechnologyDefinition } from '../../types';

export const sensorsDataTechnologyDefinition = {
	id: "sensors-data",
	name: "Sensors Data",
	website: "https://www.sensorsdata.cn",
	icon: "Sensors Data.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "sensors-data:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sensorsdata"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sensors-data:jsGlobal:1",
			kind: "jsGlobal",
			property: "sa.lib_version",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sensors-data:jsGlobal:2",
			kind: "jsGlobal",
			property: "sensorsdata_app_js_bridge_call_js",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sensors-data:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^sensorsdata2015jssdkcross$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "sensors-data:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^sensorsdata2015session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
