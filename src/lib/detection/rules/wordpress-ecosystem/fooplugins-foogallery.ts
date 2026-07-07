import type { TechnologyDefinition } from '../../types';

export const foopluginsFoogalleryTechnologyDefinition = {
	id: "fooplugins-foogallery",
	name: "FooPlugins FooGallery",
	website: "https://fooplugins.com/foogallery-wordpress-gallery-plugin",
	description: "FooPlugins FooGallery is a great image gallery plugin for WordPress.",
	icon: "FooPlugins.svg",
	categories: [
		"wordpress-ecosystem",
		"content-publishing",
	],
	rules: [
		{
			id: "fooplugins-foogallery:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/foogallery/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "fooplugins-foogallery:jsGlobal:1",
			kind: "jsGlobal",
			property: "FooGallery",
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
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
