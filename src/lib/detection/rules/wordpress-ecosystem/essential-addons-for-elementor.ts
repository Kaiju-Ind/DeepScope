import type { TechnologyDefinition } from '../../types';

export const essentialAddonsForElementorTechnologyDefinition = {
	id: "essential-addons-for-elementor",
	name: "Essential Addons for Elementor",
	website: "https://essential-addons.com/elementor/",
	description: "Essential Addons for Elementor gives you 70+ creative elements and extensions to help you extend the stock features of Elementor page builder.",
	icon: "Essential Addons for Elementor.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "essential-addons-for-elementor:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/uploads\\/essential-addons-elementor\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "essential-addons-for-elementor:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/uploads/essential-addons-elementor/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:wpdeveloper:essential_addons_for_elementor:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
