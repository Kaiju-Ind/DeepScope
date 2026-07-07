import type { TechnologyDefinition } from '../../types';

export const maxmindTechnologyDefinition = {
	id: "maxmind",
	name: "MaxMind",
	website: "https://www.maxmind.com",
	description: "MaxMind is a provider of geolocation and online fraud detection tools.",
	icon: "MaxMind.png",
	categories: [
		"maps-location",
		"privacy-compliance",
	],
	rules: [
		{
			id: "maxmind:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:device|js)\\.maxmind\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "maxmind:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("geoip\\.maxmind\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "maxmind:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("geoip-js\\.com\\/.+\\/v([\\d\\.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "maxmind:requestUrl:3",
			kind: "requestUrl",
			pattern: new RegExp("\\.maxmind\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
