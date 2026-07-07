import type { TechnologyDefinition } from '../../types';

export const radarTechnologyDefinition = {
	id: "radar",
	name: "Radar",
	website: "https://radar.com",
	description: "Radar is an all-in-one platform that integrates geofencing, maps, and geolocation.",
	icon: "Radar.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "radar:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.radar\\.com\\/v([\\d.]+)\\/radar\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "radar:jsGlobal:1",
			kind: "jsGlobal",
			property: "IsRadarInitialized",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "radar:jsGlobal:2",
			kind: "jsGlobal",
			property: "Radar.autocomplete",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
		cpe: "cpe:2.3:a:f-secure:radar:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
