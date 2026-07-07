import type { TechnologyDefinition } from '../../types';

export const ip2locationIoTechnologyDefinition = {
	id: "ip2location-io",
	name: "IP2Location.io",
	website: "https://www.ip2location.io",
	description: "IP2Location.io is a web service that provides geolocation data based on IP addresses through its API, allowing developers to integrate accurate physical location information into their applications.",
	icon: "IP2Location.io.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "ip2location-io:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^ip2location_redirection_first_visit$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
