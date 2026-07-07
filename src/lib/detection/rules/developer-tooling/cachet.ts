import type { TechnologyDefinition } from '../../types';

export const cachetTechnologyDefinition = {
	id: "cachet",
	name: "Cachet",
	website: "https://cachethq.io",
	description: "Cachet is the free and open-source status page for your API, service or company.",
	icon: "Cachet.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "cachet:jsGlobal:0",
			kind: "jsGlobal",
			property: "Cachet.Notifier",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:all-three:cachet:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
