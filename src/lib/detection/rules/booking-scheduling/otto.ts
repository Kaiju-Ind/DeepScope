import type { TechnologyDefinition } from '../../types';

export const ottoTechnologyDefinition = {
	id: "otto",
	name: "Otto",
	website: "https://otto.vet/otto-flow",
	description: "Otto is a veterinary workflow platform that streamlines scheduling, communication, and payment processes in a single system.",
	icon: "Otto.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "otto:jsGlobal:0",
			kind: "jsGlobal",
			property: "otto.id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "otto:jsGlobal:1",
			kind: "jsGlobal",
			property: "ottoCareMicrosite",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
