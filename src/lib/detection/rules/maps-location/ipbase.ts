import type { TechnologyDefinition } from '../../types';

export const ipbaseTechnologyDefinition = {
	id: "ipbase",
	name: "ipbase",
	website: "https://ipbase.com",
	description: "ipbase offers an API that supports both IPv4 and IPv6 and provides precise location data from IP addresses.",
	icon: "ipbase.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "ipbase:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("api\\.ipbase\\.com"),
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
