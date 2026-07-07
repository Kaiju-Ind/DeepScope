import type { TechnologyDefinition } from '../../types';

export const wpGoogleMapPluginTechnologyDefinition = {
	id: "wp-google-map-plugin",
	name: "WP Google Map Plugin",
	website: "https://www.wpmapspro.com",
	description: "WP Google Map Plugin allows you to create google maps shortcodes to display responsive google maps on pages, widgets and custom templates.",
	icon: "WP Google Map Plugin.png",
	categories: [
		"wordpress-ecosystem",
		"maps-location",
	],
	rules: [
		{
			id: "wp-google-map-plugin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/wp-google-map-plugin\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wp-google-map-plugin:jsGlobal:1",
			kind: "jsGlobal",
			property: "wpgmp_local",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
	implies: [
		"google-maps",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
