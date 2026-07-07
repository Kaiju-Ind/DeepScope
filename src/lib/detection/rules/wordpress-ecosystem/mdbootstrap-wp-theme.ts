import type { TechnologyDefinition } from '../../types';

export const mdbootstrapWpThemeTechnologyDefinition = {
	id: "mdbootstrap-wp-theme",
	name: "MDBootstrap WP theme",
	website: "https://mdbgo.com/docs/projects/wordpress/",
	description: "MDBootstrap WP theme is a WordPress theme built on top of the MDBootstrap front-end UI library. It provides a set of pre-designed layouts, widgets, and components that can be easily customised and integrated into WordPress websites.",
	icon: "MDBootstrap.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "mdbootstrap-wp-theme:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/mdbootstrap']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"mdbootstrap",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
