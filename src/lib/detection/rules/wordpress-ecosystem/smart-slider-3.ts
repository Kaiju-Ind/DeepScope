import type { TechnologyDefinition } from '../../types';

export const smartSlider3TechnologyDefinition = {
	id: "smart-slider-3",
	name: "Smart Slider 3",
	website: "https://smartslider3.com",
	description: "Smart Slider 3 is a responsive, SEO optimised WordPress plugin.",
	icon: "Smart Slider 3.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "smart-slider-3:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/smart-slider-3(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
		cpe: "cpe:2.3:a:nextendweb:smart_slider_3:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
