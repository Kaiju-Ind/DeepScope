import type { TechnologyDefinition } from '../../types';

export const cronitorTechnologyDefinition = {
	id: "cronitor",
	name: "Cronitor",
	website: "https://cronitor.io",
	description: "Cronitor is a monitoring tool for developers that tracks status, performance, and uptime of cron jobs, websites, APIs, and other services.",
	icon: "Cronitor.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "cronitor:jsGlobal:0",
			kind: "jsGlobal",
			property: "cronitor.q",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
