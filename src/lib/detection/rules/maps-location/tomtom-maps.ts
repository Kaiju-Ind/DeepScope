import type { TechnologyDefinition } from '../../types';

export const tomtomMapsTechnologyDefinition = {
	id: "tomtom-maps",
	name: "TomTom Maps",
	website: "https://www.tomtom.com",
	description: "TomTom Maps is a web mapping service.",
	icon: "TomTom.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "tomtom-maps:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.tomtom\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tomtom-maps:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("api\\.tomtom\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "tomtom-maps:jsGlobal:2",
			kind: "jsGlobal",
			property: "tomtom.Map",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
