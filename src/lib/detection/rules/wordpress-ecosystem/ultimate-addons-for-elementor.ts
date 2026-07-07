import type { TechnologyDefinition } from '../../types';

export const ultimateAddonsForElementorTechnologyDefinition = {
	id: "ultimate-addons-for-elementor",
	name: "Ultimate Addons for Elementor",
	website: "https://ultimateelementor.com",
	description: "Ultimate Addons for Elementor is a plugin that adds new widgets and modules to the Elementor page builder for WordPress, providing additional design options and functionality.",
	icon: "Ultimate Addons for Elementor.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "ultimate-addons-for-elementor:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/ultimate-elementor/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "ultimate-addons-for-elementor:jsGlobal:1",
			kind: "jsGlobal",
			property: "uael_particles_script.particles_url",
			valuePattern: new RegExp("\\/wp-content\\/plugins\\/ultimate-elementor\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
		cpe: "cpe:2.3:a:brainstormforce:ultimate_addons_for_elementor:*:*:*:*:*:wordpress:*:*",
	},
	implies: [
		"elementor",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
