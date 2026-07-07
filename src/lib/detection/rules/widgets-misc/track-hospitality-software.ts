import type { TechnologyDefinition } from '../../types';

export const trackHospitalitySoftwareTechnologyDefinition = {
	id: "track-hospitality-software",
	name: "Track Hospitality Software",
	website: "https://trackhs.com",
	description: "TRACK Hospitality Software is a provider of property management and hospitality SaaS solutions for managing operations in the hospitality industry.",
	icon: "TrackHS.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "track-hospitality-software:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.trackhs\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
