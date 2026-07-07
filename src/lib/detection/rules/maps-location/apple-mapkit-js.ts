import type { TechnologyDefinition } from '../../types';

export const appleMapkitJsTechnologyDefinition = {
	id: "apple-mapkit-js",
	name: "Apple MapKit JS",
	website: "https://developer.apple.com/maps/web/",
	description: "Apple MapKit JS lets you embed interactive maps directly into your websites across platforms and operating systems, including iOS and Android.",
	icon: "Apple.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "apple-mapkit-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/cdn\\.apple-mapkit\\.com\\/mk\\/([\\d\\.\\w]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "apple-mapkit-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "mapkit._tileProvider",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "apple-mapkit-js:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.apple-mapkit\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
