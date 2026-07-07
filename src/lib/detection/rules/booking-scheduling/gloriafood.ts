import type { TechnologyDefinition } from '../../types';

export const gloriafoodTechnologyDefinition = {
	id: "gloriafood",
	name: "GloriaFood",
	website: "https://www.gloriafood.com",
	description: "GloriaFood is an online ordering and food delivery platform that helps restaurant owners manage orders and streamline point-of-sale operations.",
	icon: "Oracle.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "gloriafood:jsGlobal:0",
			kind: "jsGlobal",
			property: "glfBindButtons",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gloriafood:jsGlobal:1",
			kind: "jsGlobal",
			property: "glfWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
