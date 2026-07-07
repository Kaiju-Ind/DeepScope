import type { TechnologyDefinition } from '../../types';

export const trafficguardTechnologyDefinition = {
	id: "trafficguard",
	name: "TrafficGuard",
	website: "https://trafficguard.ai",
	description: "TrafficGuard is a platform that protects digital marketing campaigns by detecting and preventing invalid traffic and ad fraud.",
	icon: "TrafficGuard.svg",
	categories: [
		"advertising-paid-media",
		"security",
	],
	rules: [
		{
			id: "trafficguard:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tgtag\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trafficguard:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("trafficguard\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "trafficguard:jsGlobal:2",
			kind: "jsGlobal",
			property: "dataTrafficGuard",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
