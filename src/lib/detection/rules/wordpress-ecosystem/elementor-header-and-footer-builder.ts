import type { TechnologyDefinition } from '../../types';

export const elementorHeaderAndFooterBuilderTechnologyDefinition = {
	id: "elementor-header-and-footer-builder",
	name: "Elementor Header & Footer Builder",
	website: "https://github.com/brainstormforce/header-footer-elementor",
	description: "Elementor Header & Footer Builder is a simple yet powerful WordPress plugin that allows you to create a layout with Elementor and set it as.",
	icon: "Elementor Header & Footer Builder.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "elementor-header-and-footer-builder:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/header-footer-elementor/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
	implies: [
		"elementor",
	],
	requires: [
		"elementor",
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
