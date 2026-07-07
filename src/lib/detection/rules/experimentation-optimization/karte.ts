import type { TechnologyDefinition } from '../../types';

export const karteTechnologyDefinition = {
	id: "karte",
	name: "Karte",
	website: "https://karte.io",
	description: "Karte is a customer engagement and marketing automation platform that enables businesses to understand their customers, deliver personalised experiences, and optimise marketing strategies.",
	icon: "Karte.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "karte:jsGlobal:0",
			kind: "jsGlobal",
			property: "__KARTE_REWRITE_ADMIN_CONFIG",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "karte:jsGlobal:1",
			kind: "jsGlobal",
			property: "__karte_live",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "karte:jsGlobal:2",
			kind: "jsGlobal",
			property: "__karte_loaded",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "karte:jsGlobal:3",
			kind: "jsGlobal",
			property: "__karte_tracker",
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
