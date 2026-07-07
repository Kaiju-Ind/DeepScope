import type { TechnologyDefinition } from '../../types';

export const blossomTravelTechnologyDefinition = {
	id: "blossom-travel",
	name: "Blossom Travel",
	website: "https://blossomthemes.com/wordpress-themes/blossom-travel",
	description: "Blossom Travel is a free WordPress theme which allows you to create various types of feminine blogs such as travel blog, personal blog, fashion blog, beauty blog, and many more.",
	icon: "Blossom.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "blossom-travel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/blossom-travel(?:-pro)?\\/.+custom\\.min\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "blossom-travel:jsGlobal:1",
			kind: "jsGlobal",
			property: "blossom_travel_data",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "blossom-travel:jsGlobal:2",
			kind: "jsGlobal",
			property: "blossom_travel_pro_data",
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
