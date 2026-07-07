import type { TechnologyDefinition } from '../../types';

export const colorlibShapelyTechnologyDefinition = {
	id: "colorlib-shapely",
	name: "Colorlib Shapely",
	website: "https://colorlib.com/wp/themes/shapely",
	description: "Colorlib Shapely is considered as a powerful, clean and beautiful full-width free WordPress theme.",
	icon: "Colorlib.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "colorlib-shapely:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/shapely\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "colorlib-shapely:dom:1",
			kind: "dom",
			selector: "link#shapely-style-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "colorlib-shapely:jsGlobal:2",
			kind: "jsGlobal",
			property: "ShapelyAdminObject",
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
