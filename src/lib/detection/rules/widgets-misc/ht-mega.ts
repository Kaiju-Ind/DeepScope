import type { TechnologyDefinition } from '../../types';

export const htMegaTechnologyDefinition = {
	id: "ht-mega",
	name: "HT Mega",
	website: "https://wordpress.org/plugins/ht-mega-for-elementor/",
	description: "Elementor addons package for Elementor.",
	icon: "HT Mega.png",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "ht-mega:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ht-mega-for-elementor(?:\\/admin)?\\/assets\\/js(?:\\/admin)?(?:\\/(?:htb)?bootstrap)?(?:\\/jquery)?(?:\\/popper)?(?:\\/slick)?(?:\\/waypoints)?(?:\\.counterup)?(?:\\/htmega-widgets-active)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ht-mega:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/ht-mega-for-elementor/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
