import type { TechnologyDefinition } from '../../types';

export const flyingImagesTechnologyDefinition = {
	id: "flying-images",
	name: "Flying Images",
	website: "https://wordpress.org/plugins/nazy-load/",
	description: "Flying Images is a performance optimisation plugin for WordPress websites designed to reduce page load times and improve the user experience.",
	icon: "default.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "flying-images:jsGlobal:0",
			kind: "jsGlobal",
			property: "flyingImages",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
