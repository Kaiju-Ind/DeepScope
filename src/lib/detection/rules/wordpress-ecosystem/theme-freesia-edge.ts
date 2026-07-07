import type { TechnologyDefinition } from '../../types';

export const themeFreesiaEdgeTechnologyDefinition = {
	id: "theme-freesia-edge",
	name: "Theme Freesia Edge",
	website: "https://themefreesia.com/themes/edge",
	description: "Edge is a responsive blogger WordPress theme by Theme Freesia.",
	icon: "Theme Freesia.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "theme-freesia-edge:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/edge(?:-plus)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "theme-freesia-edge:jsGlobal:1",
			kind: "jsGlobal",
			property: "edge_slider_value",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
