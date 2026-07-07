import type { TechnologyDefinition } from '../../types';

export const masterSliderPluginTechnologyDefinition = {
	id: "master-slider-plugin",
	name: "Master Slider Plugin",
	website: "https://wordpress.org/plugins/master-slider",
	description: "Master Slider Plugin is an SEO friendly, responsive image and video slider plugin for WordPress.",
	icon: "master_slider.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "master-slider-plugin:dom:0",
			kind: "dom",
			selector: "link#ms-main-css",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"master-slider",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
