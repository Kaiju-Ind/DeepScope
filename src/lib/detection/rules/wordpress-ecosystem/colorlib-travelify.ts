import type { TechnologyDefinition } from '../../types';

export const colorlibTravelifyTechnologyDefinition = {
	id: "colorlib-travelify",
	name: "Colorlib Travelify",
	website: "https://colorlib.com/wp/themes/travelify",
	description: "Colorlib Travelify is a responsive, free, travel WordPress theme.",
	icon: "Colorlib.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "colorlib-travelify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/travelify\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "colorlib-travelify:dom:1",
			kind: "dom",
			selector: "link#travelify-style-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "colorlib-travelify:jsGlobal:2",
			kind: "jsGlobal",
			property: "travelify_slider_value",
			description: "Page-owned global matches a known technology marker.",
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
} as const satisfies TechnologyDefinition;
