import type { TechnologyDefinition } from '../../types';

export const keenSliderTechnologyDefinition = {
	id: "keen-slider",
	name: "Keen-Slider",
	website: "https://keen-slider.io",
	description: "Keen-Slider is a free library agnostic touch slider with native touch/swipe behavior.",
	icon: "keen-slider.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "keen-slider:dom:0",
			kind: "dom",
			selector: "div.keen-slider, div.keen-slider__slide",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "keen-slider:jsGlobal:1",
			kind: "jsGlobal",
			property: "KeenSlider",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
