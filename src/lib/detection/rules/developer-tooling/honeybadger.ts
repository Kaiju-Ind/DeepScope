import type { TechnologyDefinition } from '../../types';

export const honeybadgerTechnologyDefinition = {
	id: "honeybadger",
	name: "Honeybadger",
	website: "https://www.honeybadger.io",
	description: "Honeybadger provides exception and uptime monitoring to keep your web apps error-free.",
	icon: "honey-badger.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "honeybadger:jsGlobal:0",
			kind: "jsGlobal",
			property: "Honeybadger",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "honeybadger:jsGlobal:1",
			kind: "jsGlobal",
			property: "initHoneyBadger",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
