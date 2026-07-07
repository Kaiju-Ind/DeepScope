import type { TechnologyDefinition } from '../../types';

export const stackableTechnologyDefinition = {
	id: "stackable",
	name: "Stackable",
	website: "https://wpstackable.com",
	description: "Stackable is a plugin for WordPress that offers a collection of blocks, templates, and other design tools to help users create custom, professional-looking websites.",
	icon: "Stackable.svg",
	categories: [
		"wordpress-ecosystem",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "stackable:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/stackable-ultimate-gutenberg-blocks']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "stackable:jsGlobal:1",
			kind: "jsGlobal",
			property: "stackable.restUrl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "stackable:jsGlobal:2",
			kind: "jsGlobal",
			property: "stackableAnimations",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
	},
	implies: [
		"gutenberg",
		"wordpress-block-editor",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
