import type { TechnologyDefinition } from '../../types';

export const loglibTechnologyDefinition = {
	id: "loglib",
	name: "Loglib",
	website: "https://www.loglib.io",
	description: "Loglib is a Open Source and Privacy-First web analytics that aims to provide simple yet can be powerful based on your needs.",
	icon: "Loglib.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "loglib:jsGlobal:0",
			kind: "jsGlobal",
			property: "llc",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "loglib:jsGlobal:1",
			kind: "jsGlobal",
			property: "lli",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
