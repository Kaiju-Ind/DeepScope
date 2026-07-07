import type { TechnologyDefinition } from '../../types';

export const filamentphpTechnologyDefinition = {
	id: "filamentphp",
	name: "Filamentphp",
	website: "https://filamentphp.com",
	description: "Filamentphp is a set of full-stack components designed to serve as a foundational starting point for developing applications.",
	icon: "Filament.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "filamentphp:jsGlobal:0",
			kind: "jsGlobal",
			property: "FilamentNotification",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "filamentphp:jsGlobal:1",
			kind: "jsGlobal",
			property: "filamentData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "filamentphp:jsGlobal:2",
			kind: "jsGlobal",
			property: "webpackChunkfilament",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
