import type { TechnologyDefinition } from '../../types';

export const replicacheTechnologyDefinition = {
	id: "replicache",
	name: "Replicache",
	website: "https://replicache.dev/",
	description: "Replicache is a JavaScript framework for building high-performance, offline-capable, collaborative web apps.",
	icon: "Replicache.svg",
	categories: [
		"ui-library",
		"server-runtime-infra",
	],
	rules: [],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
