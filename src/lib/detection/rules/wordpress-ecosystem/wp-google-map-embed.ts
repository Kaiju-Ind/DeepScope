import type { TechnologyDefinition } from '../../types';

export const wpGoogleMapEmbedTechnologyDefinition = {
	id: "wp-google-map-embed",
	name: "WP Google Map Embed",
	website: "https://wpgooglemap.com",
	description: "WP Google Map Embed is a lightweight WordPress plugin for embedding Google Maps with custom markers via shortcodes in posts, pages, and sidebars.",
	icon: "WP Google Map Embed.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wp-google-map-embed:dom:0",
			kind: "dom",
			selector: "link#wp-gmap-embed-front-css-css",
			description: "DOM selector matches a known technology marker.",
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
