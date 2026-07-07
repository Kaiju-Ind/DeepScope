import type { TechnologyDefinition } from '../../types';

export const geoapifyTechnologyDefinition = {
	id: "geoapify",
	name: "Geoapify",
	website: "https://www.geoapify.com",
	description: "Geoapify is a platform that provides APIs and location services for building location-aware applications.",
	icon: "Geoapify.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "geoapify:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.geoapify\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
