import type { TechnologyDefinition } from '../../types';

export const brizyWordpressTechnologyDefinition = {
	id: "brizy-wordpress",
	name: "Brizy WordPress",
	website: "https://brizy.io",
	description: "Brizy WordPress is a plugin that enables users to build and design WordPress websites with an easy-to-use drag-and-drop editor and a wide range of customizable templates.",
	icon: "Brizy.svg",
	categories: [
		"platform-cms-builder",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "brizy-wordpress:html:0",
			kind: "html",
			pattern: new RegExp("<div[^>]+class=[\"']brz-root__container"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "brizy-wordpress:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/brizy/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
	requires: [
		"wordpress",
	],
	excludes: [
		"brizy-cloud",
	],
} as const satisfies TechnologyDefinition;
