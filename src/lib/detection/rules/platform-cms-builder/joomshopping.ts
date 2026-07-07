import type { TechnologyDefinition } from '../../types';

export const joomshoppingTechnologyDefinition = {
	id: "joomshopping",
	name: "JoomShopping",
	website: "https://www.webdesigner-profi.de/joomla-webdesign/joomla-shop",
	description: "JoomShopping is an open-source ecommerce plugin for Joomla.",
	icon: "JoomShopping.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "joomshopping:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/components\\/com_jshopping\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "joomshopping:jsGlobal:1",
			kind: "jsGlobal",
			property: "joomshoppingVideoHtml5",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"onetime",
		],
	},
	implies: [
		"joomla",
	],
} as const satisfies TechnologyDefinition;
