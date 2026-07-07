import type { TechnologyDefinition } from '../../types';

export const dbIpTechnologyDefinition = {
	id: "db-ip",
	name: "db-ip",
	website: "https://db-ip.com/",
	description: "dbip is a geolocation API and database.",
	icon: "db-ip.png",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "db-ip:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.db-ip\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "db-ip:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("api\\.db-ip\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "db-ip:jsGlobal:2",
			kind: "jsGlobal",
			property: "ENV.dbip",
			description: "Page-owned global matches a known technology marker.",
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
