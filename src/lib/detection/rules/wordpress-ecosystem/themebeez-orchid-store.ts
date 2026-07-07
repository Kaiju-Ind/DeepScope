import type { TechnologyDefinition } from '../../types';

export const themebeezOrchidStoreTechnologyDefinition = {
	id: "themebeez-orchid-store",
	name: "Themebeez Orchid Store",
	website: "https://themebeez.com/themes/orchid-store",
	description: "Orchid Store is a clean, flexible, stylish and dynamic ecommerce WordPress theme by Themebeez.",
	icon: "Themebeez.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "themebeez-orchid-store:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/orchid-store(?:-child)?\\/.+bundle\\.min\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "themebeez-orchid-store:jsGlobal:1",
			kind: "jsGlobal",
			property: "orchid_store_obj",
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
