import type { TechnologyDefinition } from '../../types';

export const ipdataTechnologyDefinition = {
	id: "ipdata",
	name: "ipdata",
	website: "https://ipdata.co/",
	description: "ipdata is a JSON IP Address Geolocation API that allows users to lookup the location of both IPv4 and IPv6.",
	icon: "ipdata.png",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "ipdata:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("api\\.ipdata\\.co"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
