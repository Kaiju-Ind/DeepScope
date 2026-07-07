import type { TechnologyDefinition } from '../../types';

export const geobytesTechnologyDefinition = {
	id: "geobytes",
	name: "Geobytes",
	website: "https://geobytes.com",
	description: "Geobytes is a geolocation service that enables redirection of users and provides statistics on their geographic origin.",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "geobytes:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("gd\\.geobytes\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
