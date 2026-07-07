import type { TechnologyDefinition } from '../../types';

export const elementskitTechnologyDefinition = {
	id: "elementskit",
	name: "ElementsKit",
	website: "https://wpmet.com/plugin/elementskit",
	description: "ElementsKit is an addon for Elementor that adds additional customisation options to the page builder.",
	icon: "elementskit.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "elementskit:jsGlobal:0",
			kind: "jsGlobal",
			property: "ElementsKit_Helper",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "elementskit:jsGlobal:1",
			kind: "jsGlobal",
			property: "elementskit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"elementor",
	],
} as const satisfies TechnologyDefinition;
