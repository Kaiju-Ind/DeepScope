import type { TechnologyDefinition } from '../../types';

export const amondoTechnologyDefinition = {
	id: "amondo",
	name: "Amondo",
	website: "https://amondo.com",
	description: "Amondo is a content aggregation, curation, and publishing platform that collects, organizes, and distributes digital content across channels.",
	icon: "Amondo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "amondo:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.amondo\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "amondo:jsGlobal:1",
			kind: "jsGlobal",
			property: "amondo.imprint",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amondo:jsGlobal:2",
			kind: "jsGlobal",
			property: "amondo_init",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
