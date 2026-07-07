import type { TechnologyDefinition } from '../../types';

export const ematicSolutionsTechnologyDefinition = {
	id: "ematic-solutions",
	name: "Ematic Solutions",
	website: "https://www.ematicsolutions.com",
	description: "Ematic Solutions is part of Ematic Group and started to revolve around transforming email marketing into an ROI machine.",
	icon: "Ematic Solutions.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "ematic-solutions:jsGlobal:0",
			kind: "jsGlobal",
			property: "EmaticsObject",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ematic-solutions:jsGlobal:1",
			kind: "jsGlobal",
			property: "ematicApikey",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ematic-solutions:jsGlobal:2",
			kind: "jsGlobal",
			property: "ematics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ematic-solutions:jsGlobal:3",
			kind: "jsGlobal",
			property: "ematicsSubscribe",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
