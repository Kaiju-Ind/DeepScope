import type { TechnologyDefinition } from '../../types';

export const masterSliderTechnologyDefinition = {
	id: "master-slider",
	name: "Master Slider",
	website: "https://www.masterslider.com",
	description: "Master Slider is an SEO friendly, responsive image and video slider.",
	icon: "master_slider.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "master-slider:jsGlobal:0",
			kind: "jsGlobal",
			property: "MasterSlider",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "master-slider:jsGlobal:1",
			kind: "jsGlobal",
			property: "MasterSlider.version",
			valuePattern: new RegExp("^([0-9\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
