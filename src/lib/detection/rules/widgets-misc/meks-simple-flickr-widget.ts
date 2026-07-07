import type { TechnologyDefinition } from '../../types';

export const meksSimpleFlickrWidgetTechnologyDefinition = {
	id: "meks-simple-flickr-widget",
	name: "Meks Simple Flickr Widget",
	website: "https://wordpress.org/plugins/meks-simple-flickr-widget",
	description: "Meks Simple Flickr Widget is a WordPress plugin created by Meks. This plugin is designed to help WordPress website owners easily integrate Flickr photo streams into their websites.",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "meks-simple-flickr-widget:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/meks-simple-flickr-widget/'], link#meks-flickr-widget-css",
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
