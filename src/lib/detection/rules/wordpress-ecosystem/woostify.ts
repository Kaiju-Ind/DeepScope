import type { TechnologyDefinition } from '../../types';

export const woostifyTechnologyDefinition = {
	id: "woostify",
	name: "Woostify",
	website: "https://woostify.com",
	description: "Woostify is fast, lightweight, responsive and flexible WooCommerce theme built with SEO, speed, and usability in mind.",
	icon: "Woostify.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "woostify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/woostify\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "woostify:jsGlobal:1",
			kind: "jsGlobal",
			property: "woostifyConditionScrolling",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "woostify:jsGlobal:2",
			kind: "jsGlobal",
			property: "woostify_woocommerce_general",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"woocommerce",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
