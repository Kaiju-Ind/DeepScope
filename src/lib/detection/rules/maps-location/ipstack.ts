import type { TechnologyDefinition } from '../../types';

export const ipstackTechnologyDefinition = {
	id: "ipstack",
	name: "ipstack",
	website: "https://ipstack.com",
	description: "ipstack is a real-time IP to geolocation API capable of looking at location data and assessing security threats originating from risky IP addresses.",
	icon: "ipstack.png",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "ipstack:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("api\\.ipstack\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "ipstack:jsGlobal:1",
			kind: "jsGlobal",
			property: "ENV.ipStackAccessToken",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
		],
	},
} as const satisfies TechnologyDefinition;
