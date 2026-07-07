import type { TechnologyDefinition } from '../../types';

export const drchronoTechnologyDefinition = {
	id: "drchrono",
	name: "DrChrono",
	website: "https://www.drchrono.com",
	description: "DrChrono is an electronic health record system that centralizes clinical documentation, scheduling, billing, and patient management to support healthcare operations.",
	icon: "DrChrono.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "drchrono:dom:0",
			kind: "dom",
			selector: "form[action*='drchrono.com/scheduling/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "drchrono:jsGlobal:1",
			kind: "jsGlobal",
			property: "DRCHRONO_REACT_BUNDLE_LOADED",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "drchrono:jsGlobal:2",
			kind: "jsGlobal",
			property: "dispatchDrChronoEvent",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
