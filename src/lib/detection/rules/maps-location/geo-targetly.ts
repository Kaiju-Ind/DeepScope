import type { TechnologyDefinition } from '../../types';

export const geoTargetlyTechnologyDefinition = {
	id: "geo-targetly",
	name: "Geo Targetly",
	website: "https://geotargetly.com",
	description: "Geo Targetly is a website geo personalisation software.",
	icon: "Geo Targetly.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "geo-targetly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("geotargetly\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
