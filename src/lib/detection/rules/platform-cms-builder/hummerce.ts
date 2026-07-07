import type { TechnologyDefinition } from '../../types';

export const hummerceTechnologyDefinition = {
	id: "hummerce",
	name: "Hummerce",
	website: "https://hummerce.com",
	description: "Hummerce is a B2C/B2B ecommerce platform designed to support online sales with a stable and scalable foundation.",
	icon: "Hummerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "hummerce:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Hummerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "hummerce:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^hummerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
