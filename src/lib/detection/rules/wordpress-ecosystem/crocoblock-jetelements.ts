import type { TechnologyDefinition } from '../../types';

export const crocoblockJetelementsTechnologyDefinition = {
	id: "crocoblock-jetelements",
	name: "Crocoblock JetElements",
	website: "https://crocoblock.com/plugins/jetelements",
	description: "Crocoblock JetElements is an addon for Elementor that adds additional customisation options to the page builder.",
	icon: "Crocoblock.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "crocoblock-jetelements:jsGlobal:0",
			kind: "jsGlobal",
			property: "jetElements",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"elementor",
	],
} as const satisfies TechnologyDefinition;
