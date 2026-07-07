import type { TechnologyDefinition } from '../../types';

export const radarioTechnologyDefinition = {
	id: "radario",
	name: "Radario",
	website: "https://business.radario.ru",
	description: "Radario is a Russia-based ticketing system designed for event management and ticket sales.",
	icon: "Radario.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "radario:jsGlobal:0",
			kind: "jsGlobal",
			property: "radario.accentColor",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "radario:jsGlobal:1",
			kind: "jsGlobal",
			property: "radarioButtonScript",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
