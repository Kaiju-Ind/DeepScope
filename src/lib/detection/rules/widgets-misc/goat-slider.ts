import type { TechnologyDefinition } from '../../types';

export const goatSliderTechnologyDefinition = {
	id: "goat-slider",
	name: "Goat Slider",
	website: "https://goatslider.com",
	description: "Goat Slider is a webflow library that enables users to construct advanced sliders for their sites.",
	icon: "GoatSlider.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "goat-slider:jsGlobal:0",
			kind: "jsGlobal",
			property: "GoatSliderCarousel",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "goat-slider:jsGlobal:1",
			kind: "jsGlobal",
			property: "GoatSliderSlider",
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
