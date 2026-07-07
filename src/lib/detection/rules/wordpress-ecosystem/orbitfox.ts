import type { TechnologyDefinition } from '../../types';

export const orbitfoxTechnologyDefinition = {
	id: "orbitfox",
	name: "OrbitFox",
	website: "https://themeisle.com/plugins/orbit-fox-companion",
	description: "OrbitFox is a multi-featured WordPress plugin that works with the Elementor, Beaver Builder and WordPress Block Editor site-building utilities by Themeisle.",
	icon: "OrbitFox.svg",
	categories: [
		"wordpress-ecosystem",
		"widgets-misc",
	],
	rules: [
		{
			id: "orbitfox:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/themeisle-companion/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:themeisle:orbit_fox:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
