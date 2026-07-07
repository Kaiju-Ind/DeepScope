import type { TechnologyDefinition } from '../../types';

export const segmentifyTechnologyDefinition = {
	id: "segmentify",
	name: "Segmentify",
	website: "https://segmentify.com",
	description: "Segmentify is an ecommerce personalisation platform.",
	icon: "Segmentify.svg",
	categories: [
		"search",
		"marketing-automation",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "segmentify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.segmentify\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "segmentify:jsGlobal:1",
			kind: "jsGlobal",
			property: "SegmentifyIntegration",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "segmentify:jsGlobal:2",
			kind: "jsGlobal",
			property: "SegmentifyTrackingObject",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
