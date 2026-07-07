import type { TechnologyDefinition } from '../../types';

export const enkodTechnologyDefinition = {
	id: "enkod",
	name: "Enkod",
	website: "https://enkod.io",
	description: "Enkod is a CDP platform designed for marketing automation.",
	icon: "Enkod.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "enkod:jsGlobal:0",
			kind: "jsGlobal",
			property: "enKodBox.token",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
