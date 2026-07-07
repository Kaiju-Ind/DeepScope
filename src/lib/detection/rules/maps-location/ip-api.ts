import type { TechnologyDefinition } from '../../types';

export const ipApiTechnologyDefinition = {
	id: "ip-api",
	name: "ip-api",
	website: "https://ip-api.com/",
	icon: "ip-api.png",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "ip-api:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("ip-api\\.com"),
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
