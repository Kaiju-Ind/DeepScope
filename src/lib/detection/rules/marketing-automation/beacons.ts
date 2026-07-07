import type { TechnologyDefinition } from '../../types';

export const beaconsTechnologyDefinition = {
	id: "beacons",
	name: "Beacons",
	website: "https://beacons.ai",
	description: "Beacons is an AI-powered creator platform that enables selling through a creator store, building an email marketing strategy, and securing brand deals in one place.",
	icon: "Beacons.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "beacons:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.beacons\\.ai"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
