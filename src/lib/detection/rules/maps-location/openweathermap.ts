import type { TechnologyDefinition } from '../../types';

export const openweathermapTechnologyDefinition = {
	id: "openweathermap",
	name: "OpenWeatherMap",
	website: "https://openweathermap.org",
	description: "OpenWeatherMap is a web-based platform that provides interactive maps displaying current weather conditions, precipitation, and related meteorological data across various geographic locations.",
	icon: "OpenWeatherMap.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "openweathermap:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.openweathermap\\.org"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
