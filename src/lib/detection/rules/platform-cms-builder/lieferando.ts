import type { TechnologyDefinition } from '../../types';

export const lieferandoTechnologyDefinition = {
	id: "lieferando",
	name: "Lieferando",
	website: "https://www.lieferando.de",
	description: "Lieferando is an online portal for food orders.",
	icon: "Lieferando.svg",
	categories: [
		"platform-cms-builder",
		"booking-scheduling",
	],
	rules: [
		{
			id: "lieferando:jsGlobal:0",
			kind: "jsGlobal",
			property: "Tealium.pagedata.country",
			valuePattern: new RegExp("lieferando\\.de"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
