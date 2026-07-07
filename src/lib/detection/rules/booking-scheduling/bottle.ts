import type { TechnologyDefinition } from '../../types';

export const bottleTechnologyDefinition = {
	id: "bottle",
	name: "Bottle",
	website: "https://bottle.com",
	description: "Bottle is an all-in-one software for meal delivery businesses, enhancing operational efficiency and customer management.",
	icon: "Bottle.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "bottle:jsGlobal:0",
			kind: "jsGlobal",
			property: "webpackChunkbottle_merchant_vue",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
	implies: [
		"stripe",
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
