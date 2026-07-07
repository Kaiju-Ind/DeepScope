import type { TechnologyDefinition } from '../../types';

export const dtscoutTechnologyDefinition = {
	id: "dtscout",
	name: "DTScout",
	website: "https://www.dtscout.com",
	description: "DTScout is a marketing data intelligence software.",
	icon: "DTScout.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "dtscout:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.dtscout\\.com\\/"),
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
