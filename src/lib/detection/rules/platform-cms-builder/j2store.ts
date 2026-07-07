import type { TechnologyDefinition } from '../../types';

export const j2storeTechnologyDefinition = {
	id: "j2store",
	name: "J2Store",
	website: "https://www.j2store.org",
	description: "J2Store is a Joomla shopping cart and ecommerce extension.",
	icon: "j2store.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "j2store:jsGlobal:0",
			kind: "jsGlobal",
			property: "j2storeURL",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"onetime",
		],
		cpe: "cpe:2.3:a:j2store:j2store:*:*:*:*:*:joomla\\!:*:*",
	},
	implies: [
		"joomla",
	],
} as const satisfies TechnologyDefinition;
