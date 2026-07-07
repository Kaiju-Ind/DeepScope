import type { TechnologyDefinition } from '../../types';

export const instantgeoTechnologyDefinition = {
	id: "instantgeo",
	name: "InstantGeo",
	website: "https://instantgeo.info",
	description: "InstantGeo is a service that provides IP geolocation to web pages.",
	icon: "InstantGeo.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "instantgeo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.instantgeo\\.info"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "instantgeo:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("script\\.instantgeo\\.info"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "instantgeo:jsGlobal:2",
			kind: "jsGlobal",
			property: "geojs",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
