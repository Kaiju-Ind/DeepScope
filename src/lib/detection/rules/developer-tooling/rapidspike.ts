import type { TechnologyDefinition } from '../../types';

export const rapidspikeTechnologyDefinition = {
	id: "rapidspike",
	name: "RapidSpike",
	website: "https://www.rapidspike.com",
	description: "RapidSpike is an uptime and performance monitoring service for web sites and applications.",
	icon: "RapidSpike.svg",
	categories: [
		"developer-tooling",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "rapidspike:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.rapidspike\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rapidspike:jsGlobal:1",
			kind: "jsGlobal",
			property: "rspike_timing",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
