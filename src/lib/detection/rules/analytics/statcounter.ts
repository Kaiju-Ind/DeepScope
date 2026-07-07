import type { TechnologyDefinition } from '../../types';

export const statcounterTechnologyDefinition = {
	id: "statcounter",
	name: "Statcounter",
	website: "https://www.statcounter.com",
	icon: "Statcounter.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "statcounter:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("statcounter\\.com\\/counter\\/counter"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "statcounter:jsGlobal:1",
			kind: "jsGlobal",
			property: "_statcounter",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "statcounter:jsGlobal:2",
			kind: "jsGlobal",
			property: "sc_project",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "statcounter:jsGlobal:3",
			kind: "jsGlobal",
			property: "sc_security",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
