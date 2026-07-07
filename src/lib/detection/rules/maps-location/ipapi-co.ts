import type { TechnologyDefinition } from '../../types';

export const ipapiCoTechnologyDefinition = {
	id: "ipapi-co",
	name: "ipapi.co",
	website: "https://ipapi.co",
	description: "ipapi.co is a web analytics provider with IP address lookup and location API.",
	icon: "ipapi.co.png",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "ipapi-co:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("ipapi\\.co\\/"),
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
