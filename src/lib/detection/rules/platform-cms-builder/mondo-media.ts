import type { TechnologyDefinition } from '../../types';

export const mondoMediaTechnologyDefinition = {
	id: "mondo-media",
	name: "Mondo Media",
	website: "https://mondo-media.de",
	description: "Mondo Media is a German digital agency that specializes in web design, development, digital marketing, and ecommerce solutions tailored to businesses and organizations.",
	icon: "Mondo Media.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mondo-media:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Mondo Shop", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "mondo-media:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("mondo shop", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
