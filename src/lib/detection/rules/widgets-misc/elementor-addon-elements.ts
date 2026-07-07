import type { TechnologyDefinition } from '../../types';

export const elementorAddonElementsTechnologyDefinition = {
	id: "elementor-addon-elements",
	name: "Elementor Addon Elements",
	website: "https://wordpress.org/plugins/addon-elements-for-elementor-page-builder",
	description: "Widgets and extensions to extend the Elementor Page Builder.",
	icon: "Elementor Addon Elements.png",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "elementor-addon-elements:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("addon-elements-for-elementor-page-builder(?:\\/assets)?(?:\\/js)?(?:\\/lib)?(?:\\/animated-main)?(?:\\/build)?(?:\\/eae)?(?:\\/iconHelper)?(?:\\/index)?(?:\\/magnific)?(?:\\/particles)?(?:\\/vegas){0,2}(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "elementor-addon-elements:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/addon-elements-for-elementor-page-builder/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "elementor-addon-elements:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("addon-elements-for-elementor-page-builder(?:\\/assets)?(?:\\/js)?(?:\\/lib)?(?:\\/animated-main)?(?:\\/build)?(?:\\/eae)?(?:\\/iconhelper)?(?:\\/index)?(?:\\/magnific)?(?:\\/particles)?(?:\\/vegas){0,2}(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
