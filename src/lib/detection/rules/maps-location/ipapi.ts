import type { TechnologyDefinition } from '../../types';

export const ipapiTechnologyDefinition = {
	id: "ipapi",
	name: "ipapi",
	website: "https://ipapi.com",
	description: "ipapi is a real-time geolocation and reverse IP lookup REST API.",
	icon: "ipapi.png",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "ipapi:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("api\\.ipapi\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
