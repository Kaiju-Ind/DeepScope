import type { TechnologyDefinition } from '../../types';

export const ipgeolocationTechnologyDefinition = {
	id: "ipgeolocation",
	name: "ipgeolocation",
	website: "https://ipgeolocation.co/",
	description: "ipgeolocation is an IP Geolocation API and Accurate IP Lookup Database.",
	icon: "ipgeolocation.png",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "ipgeolocation:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("api\\.ipgeolocation\\.io"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
