import type { TechnologyDefinition } from '../../types';

export const airshipTechnologyDefinition = {
	id: "airship",
	name: "Airship",
	website: "https://www.airship.com",
	description: "Airship is an American company that provides marketing and branding services. Airship allows companies to generate custom messages to consumers via push notifications, SMS messaging, and similar, and provides customer analytics services.",
	icon: "Airship.svg",
	categories: [
		"marketing-automation",
		"analytics",
	],
	rules: [
		{
			id: "airship:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("urbanairship\\.\\w+\\/notify\\/v([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
