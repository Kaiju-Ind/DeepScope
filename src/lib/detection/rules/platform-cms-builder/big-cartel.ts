import type { TechnologyDefinition } from '../../types';

export const bigCartelTechnologyDefinition = {
	id: "big-cartel",
	name: "Big Cartel",
	website: "https://www.bigcartel.com",
	description: "Big Cartel is a cloud-hosted ecommerce platform.",
	icon: "Big Cartel.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "big-cartel:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Big Cartel", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "big-cartel:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("big cartel", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
