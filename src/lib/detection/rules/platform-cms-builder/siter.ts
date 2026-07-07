import type { TechnologyDefinition } from '../../types';

export const siterTechnologyDefinition = {
	id: "siter",
	name: "Siter",
	website: "https://siter.io",
	description: "Siter is a responsive, no-code site builder that uses a drag-and-drop interface for creating websites without the need for programming skills.",
	icon: "Siter.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "siter:jsGlobal:0",
			kind: "jsGlobal",
			property: "readySiterPage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "siter:jsGlobal:1",
			kind: "jsGlobal",
			property: "renderSiterPage",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
