import type { TechnologyDefinition } from '../../types';

export const mappressTechnologyDefinition = {
	id: "mappress",
	name: "MapPress",
	website: "https://mappresspro.com",
	description: "MapPress is a WordPress plugin that provides easy integration of interactive maps into WordPress websites.",
	icon: "MapPress.png",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "mappress:dom:0",
			kind: "dom",
			selector: "link[href*='wp-content/plugins/mappress-google-maps-for-wordpress/'], #mappress-leaflet-css, #mappress-css",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
